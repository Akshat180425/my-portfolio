"""Closest pair in the plane: a reviewed companion to Theory Basics - 1.

Python 3.10+, standard library only. Returns ONE minimum-distance pair.
Coordinates must be integers (bool is rejected); squared distances stay exact.
O(n log n) comparisons/arithmetic operations, O(n) auxiliary space. The cost of
arithmetic on arbitrarily large integers also depends on their bit length.
Original lecture and script remain separate, unchanged archival materials.
"""

from dataclasses import dataclass
from typing import Iterable


@dataclass(frozen=True)
class ClosestPair:
    indices: tuple[int, int]
    points: tuple[tuple[int, int], tuple[int, int]]
    squared_distance: int


def closest_pair(points: Iterable[tuple[int, int]]) -> ClosestPair:
    """Find one closest pair; raise ValueError for fewer than two points.

    Duplicate coordinates are distinct input points. Ties are deterministic for
    a fixed input but do not promise the lexicographically first pair. The input
    is not modified. Integers deliberately avoid floating-point roundoff here.
    """
    original = []
    for point in points:
        try:
            x, y = point
        except (TypeError, ValueError) as error:
            raise ValueError("Each point must contain exactly two integers.") from error
        if type(x) is not int or type(y) is not int:
            raise TypeError("Coordinates must be integers, not bool or float.")
        original.append((x, y))
    if len(original) < 2:
        raise ValueError("At least two points are required.")

    # An entry is (x, y, original_index, x_rank). Unique ranks identify the half
    # even when many points have the same x coordinate.
    by_x = sorted((x, y, i) for i, (x, y) in enumerate(original))
    by_x = [(x, y, i, rank) for rank, (x, y, i) in enumerate(by_x)]

    def candidate(a, b):
        distance2 = (a[0] - b[0]) ** 2 + (a[1] - b[1]) ** 2
        return distance2, tuple(sorted((a[2], b[2])))

    def result(best):
        distance2, (i, j) = best
        return ClosestPair((i, j), (original[i], original[j]), distance2)

    # A zero distance is globally minimal. Handle it before the packing proof,
    # which assumes distinct coordinates and a positive distance.
    for a, b in zip(by_x, by_x[1:]):
        if a[:2] == b[:2]:
            return result(candidate(a, b))
    by_y = sorted(by_x, key=lambda p: (p[1], p[0], p[2]))

    def solve(px, py):
        if len(px) <= 3:
            return min(candidate(px[i], px[j])
                       for i in range(len(px)) for j in range(i + 1, len(px)))
        mid = len(px) // 2
        split_x, _, _, split_rank = px[mid]
        # Linear stable partition: both output lists retain their y ordering.
        left_y, right_y = [], []
        for point in py:
            (left_y if point[3] < split_rank else right_y).append(point)
        best = min(solve(px[:mid], left_y), solve(px[mid:], right_y))
        strip = [p for p in py if (p[0] - split_x) ** 2 < best[0]]
        for i, a in enumerate(strip):
            # At most seven later points fit in the relevant 2d-by-d rectangle.
            for b in strip[i + 1:i + 8]:
                if (b[1] - a[1]) ** 2 >= best[0]:
                    break
                current = candidate(a, b)
                if current[0] < best[0]:
                    best = current
        return best

    return result(solve(by_x, by_y))


if __name__ == "__main__":
    sample = [(2, 3), (12, 30), (40, 50), (5, 1), (12, 10), (3, 4)]
    answer = closest_pair(sample)
    print("Pair:", answer.points)
    print("Original indices:", answer.indices)
    print("Squared distance:", answer.squared_distance)
