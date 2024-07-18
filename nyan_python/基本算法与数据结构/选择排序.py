def selection_sort(arr):
    n = len(arr)
    for i in range(n): # 0, 1, 2, 3, 4, 5
        min_idx = i
        for j in range(i+1, n): # [1,2,3,4,5,6],[2,3,4,5,6], [3,4,5,6],[4,5,6],[5,6],[6]
            if arr[j] < arr[min_idx]:
                min_idx = j
        arr[i], arr[min_idx] = arr[min_idx], arr[i]
           
    return arr

# 使用示例
arr = [64, 34, 25, 12, 22, 11, 90]
sorted_arr = selection_sort(arr)
print(sorted_arr)  # 输出: [11, 12, 22, 25, 64]