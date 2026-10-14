import math

# Function to calculate the Euclidean distance between two points
def euclidean_distance(p1, p2):
    return math.sqrt((p1[0] - p2[0])**2 + (p1[1] - p2[1])**2)

# Function to find the closest pair of points using brute force method
def closest_pair_brute_force(points):
    n = len(points)
    if n < 2:
        return float('inf'), None, None
    
    min_dist = float('inf')
    best_pairs = []
    for i in range(n):
        for j in range(i+1, n):
            dist = euclidean_distance(points[i], points[j])
            if dist < min_dist:
                min_dist = dist
                best_pairs = [(points[i], points[j])]
            elif dist == min_dist:
                best_pairs.append((points[i], points[j]))
    
    return min_dist, best_pairs

# Function to find the closest pair of points using divide and conquer method
def closest_pair_divide_conquer(points_x, points_y):
    n = len(points_x)
    
    # Base case: if there are 3 or fewer points, use brute force
    if n <= 3:
        return closest_pair_brute_force(points_x)
    
    # Divide the points into two halves
    mid = n // 2
    Qx = points_x[:mid]
    Rx = points_x[mid:]
    
    # Split the points into two halves based on the median x-coordinate
    midpoint = points_x[mid][0]
    Qy = []
    Ry = []
    
    for point in points_y:
        if point in Qx:
            Qy.append(point)
        else:
            Ry.append(point)
    
    # Recursively find the closest pair in each half
    (min_dist_left, best_pairs_left) = closest_pair_divide_conquer(Qx, Qy)
    (min_dist_right, best_pairs_right) = closest_pair_divide_conquer(Rx, Ry)
    
    # Combine best pairs from left and right halves
    if min_dist_left < min_dist_right:
        min_dist = min_dist_left
        best_pairs = best_pairs_left
    elif min_dist_right < min_dist_left:
        min_dist = min_dist_right
        best_pairs = best_pairs_right
    else:
        min_dist = min_dist_left
        best_pairs = best_pairs_left + best_pairs_right
    
    # Check for the closest pairs that span across the dividing line
    strip = []
    for point in points_y:
        if abs(point[0] - midpoint) < min_dist:
            strip.append(point)
    
    # Compare points in the strip to find potential smaller distance
    strip_size = len(strip)
    for i in range(strip_size):
        for j in range(i + 1, min(i + 5, strip_size)):
            dist = euclidean_distance(strip[i], strip[j])
            if dist < min_dist:
                min_dist = dist
                best_pairs = [(strip[i], strip[j])]
            elif dist == min_dist:
                best_pairs.append((strip[i], strip[j]))
    
    return min_dist, best_pairs

# Function to find the closest pair of points in the plane
def closest_pair(points):
    # Sort points by x-coordinate
    points_sorted_by_x = sorted(points)
    # Sort points by y-coordinate
    points_sorted_by_y = sorted(points, key=lambda x: x[1])
    
    # Call the divide and conquer function
    return closest_pair_divide_conquer(points_sorted_by_x, points_sorted_by_y)

# Example usage:
points = [(37, 71), (17, 81), (85, 31), (25, 84), (31, 21), (15, 12), (69, 68), (83, 97), (43, 38), (74, 56), (48, 73), (89, 45), (34, 65), (97, 26), (12, 54), (45, 63), (21, 85), (59, 37), (76, 29), (62, 49), (38, 41), (93, 18), (27, 72), (82, 84), (51, 96), (19, 25), (88, 32), (35, 67), (67, 58), (42, 81), (78, 47), (23, 62), (56, 14), (14, 32), (64, 55), (29, 23), (71, 83), (87, 69), (53, 74), (94, 39), (16, 49), (79, 15), (36, 68), (61, 78), (22, 43), (44, 36), (99, 61), (13, 87), (86, 59), (58, 17), (75, 98), (52, 57), (33, 44), (68, 27), (73, 51), (91, 94), (24, 82), (41, 76), (81, 22), (47, 13), (98, 92), (63, 24), (28, 16), (72, 52), (18, 69), (54, 42), (92, 85), (77, 19), (32, 93), (66, 64), (49, 48), (96, 35), (11, 89), (67, 74), (83, 36), (21, 28), (58, 71), (75, 11), (39, 57), (94, 45), (27, 31), (71, 62), (85, 76), (52, 83), (38, 96), (63, 14), (18, 53), (46, 82), (97, 29), (12, 64), (69, 37), (33, 41), (81, 18), (57, 26), (44, 89), (29, 72), (76, 43), (53, 91), (91, 54), (37, 83)]

min_dist, closest_pairs = closest_pair(points)

print("Closest pair/s with minimum distance:", closest_pairs)
print("Minimum distance:", min_dist)
