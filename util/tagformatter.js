// Dirty little hack because en|decodeURIComponent 
// produces ids which will not work as tags with JQuery UI drag and drop magic on alloc page
/**
 * @param {string} tag
 * @return {string}
 */
exports.decode = function(tag) {
    return tag.replace("Z",':')
}
/**
 * @param {string} id
 * @return {string}
 */
exports.encode = function(id) {
    return id.replace(':','Z')
}
