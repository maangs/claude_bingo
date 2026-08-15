export function checkWin(marked: boolean[], size: number): boolean {
  const at = (row: number, col: number) => marked[row * size + col]

  for (let row = 0; row < size; row++) {
    let full = true
    for (let col = 0; col < size; col++) {
      if (!at(row, col)) {
        full = false
        break
      }
    }
    if (full) return true
  }

  for (let col = 0; col < size; col++) {
    let full = true
    for (let row = 0; row < size; row++) {
      if (!at(row, col)) {
        full = false
        break
      }
    }
    if (full) return true
  }

  let diag1 = true
  let diag2 = true
  for (let i = 0; i < size; i++) {
    if (!at(i, i)) diag1 = false
    if (!at(i, size - 1 - i)) diag2 = false
  }

  return diag1 || diag2
}
