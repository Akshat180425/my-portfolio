"""Run beside closest_pair.py: python -m unittest -v test_closest_pair.py"""
import itertools
import random
import unittest
from closest_pair import closest_pair


def brute_distance(points):
    return min((a[0]-b[0])**2 + (a[1]-b[1])**2
               for a, b in itertools.combinations(points, 2))


class ClosestPairTests(unittest.TestCase):
    def assert_matches(self, points):
        actual = closest_pair(points)
        i, j = actual.indices
        self.assertTrue(0 <= i < j < len(points))
        self.assertEqual(actual.points, (tuple(points[i]), tuple(points[j])))
        self.assertEqual(actual.squared_distance, brute_distance(points))
        self.assertEqual(actual.squared_distance, brute_distance(actual.points))

    def test_empty_and_singleton(self):
        for points in ([], [(1, 2)]):
            with self.assertRaises(ValueError):
                closest_pair(points)

    def test_two_points(self):
        self.assert_matches([(0, 0), (3, 4)])

    def test_three_points(self):
        self.assert_matches([(0, 0), (8, 9), (1, 1)])

    def test_duplicates(self):
        self.assert_matches([(4, 8), (0, 0), (4, 8), (10, 12)])
        self.assert_matches([(3, 3)] * 20)

    def test_vertical_and_horizontal(self):
        for points in ([(0, y) for y in range(40)], [(x, 0) for x in range(40)]):
            self.assert_matches(points)

    def test_cross_boundary(self):
        self.assert_matches([(-20, 90), (-12, 40), (-1, 0), (1, 0), (11, 50), (19, 100)])

    def test_equal_x_and_ties(self):
        self.assert_matches([(x, y) for x in range(3) for y in range(15)])

    def test_large_integer_coordinates(self):
        base = 10**100
        self.assert_matches([(base, base), (base+1, base+1), (-base, 0), (0, -base)])

    def test_invalid_coordinates(self):
        for point in ((1.5, 2), (True, 1), (float('nan'), 0), ('1', 2)):
            with self.assertRaises(TypeError):
                closest_pair([(0, 0), point])
        for point in ((1,), (1, 2, 3), None):
            with self.assertRaises(ValueError):
                closest_pair([(0, 0), point])

    def test_input_unchanged_and_generator(self):
        points = [[3, 4], [0, 0], [8, 9], [-1, -1]]
        before = [p[:] for p in points]
        self.assert_matches(points)
        self.assertEqual(points, before)
        self.assertEqual(closest_pair(iter(points)), closest_pair(points))

    def test_every_small_grid_subset(self):
        grid = list(itertools.product(range(3), repeat=2))
        # 502 distinct subsets of a 3-by-3 grid, of sizes 2 through 9.
        for n in range(2, 10):
            for points in itertools.combinations(grid, n):
                self.assert_matches(points)

    def test_1000_reproducible_random_inputs(self):
        rng = random.Random(20261014)
        for _ in range(1000):
            points = [(rng.randrange(-1000, 1001), rng.randrange(-1000, 1001))
                      for _ in range(rng.randrange(2, 81))]
            self.assert_matches(points)


if __name__ == '__main__':
    unittest.main()
