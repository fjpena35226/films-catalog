/**
 * Compare two objects by a common property down first
 * @param {Object} a : Oject a for compare
 * @param {Object} b : Oject b for compare
 * @param {String} orderBy : The property name for compare
 * @returns 
 */
 export function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1
    }
    if (b[orderBy] > a[orderBy]) {
      return 1
    }
    return 0
  }
  
  /**
   * 
   * @param {String} order : Set the order desc | asc
   * @param {String} orderBy : The property name for compare
   * @returns 
   */
  export function getComparator(order, orderBy) {
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy)
  }
  
  /**
   * Sort by comparator
   * @param {Array} array 
   * @param {function} comparator 
   * @returns 
   */
  export function stableSort(array, comparator) {
    if (array) {
      const stabilizedThis = array.map((el, index) => [el, index])
      stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0])
        if (order !== 0) return order
        return a[1] - b[1]
      })
      return stabilizedThis.map((el) => el[0])
    } else return []
  }
  