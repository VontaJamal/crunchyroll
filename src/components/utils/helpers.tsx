export const titleCase = (category: string) => {
  if (!category) return
  return category[0].toUpperCase() + category.slice(1).toLowerCase()
}
