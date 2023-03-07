import cv2 as cv
import numpy as np
from dataclasses import dataclass


@dataclass
class Cartoon:
    k_size = 3
    d = 9
    sigmaColor = 250
    sigmaSpace = 250
    k = 5
    attempt = 10
    it = 20
    block_size = 9

    def image_to_cartoon(self, image: str):

        image = cv.imread(image)
        imageBlurColor = cv.medianBlur(image, self.k_size)
        gray = cv.cvtColor(src=image, code=cv.COLOR_BGR2GRAY)

        edges = cv.adaptiveThreshold(
            gray, 255, cv.ADAPTIVE_THRESH_MEAN_C, cv.THRESH_BINARY, self.block_size, 12)

        # transform image
        transformedImage = np.float32(imageBlurColor).reshape((-1, 3))

        # criteria
        criteria = (cv.TermCriteria_EPS +
                    cv.TermCriteria_MAX_ITER, self.it, 0.001)

        # kmeans cluster
        ret, label, center = cv.kmeans(
            transformedImage, self.k, None, criteria, self.attempt, cv.KMEANS_RANDOM_CENTERS)

        center = np.uint8(center)
        result = center[label.flatten()]
        result = result.reshape(imageBlurColor.shape)

        color = cv.bilateralFilter(
            result, self.d, self.sigmaColor, self.sigmaSpace)
        cartoon = cv.bitwise_and(color, color, mask=edges)
        cv.imwrite("cartoon.png", cartoon)
