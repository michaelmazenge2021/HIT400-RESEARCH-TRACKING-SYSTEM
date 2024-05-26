const PdfDetails = require("../pdfDetails");


  const handleSearch = async (req, res) => {
    const Detail = await PdfDetails.find().exec()
    const term = req.query.query ? req.query.query.split(/\s+/) : [];
  
    if (term.length === 0) {
      return res.status(400).json({ error: "Name parameter is required" });
    }
  
    const hashTable = {}; // Create a hash table
  
    // Build the hash table
    Detail.forEach(user => {
      user.keywords.forEach(keyword => {
        const normalizedKeyword = keyword.toLowerCase();
        if (!hashTable[normalizedKeyword]) {
          hashTable[normalizedKeyword] = [];
        }
        hashTable[normalizedKeyword].push(user);
      });
    });
  
    const searchResult = term.reduce((result, tem) => {
      const normalizedTerm = tem.toLowerCase();
      if (hashTable[normalizedTerm]) {
        result.push(...hashTable[normalizedTerm]);
      }
      return result;
    }, []);
  
    // Remove duplicates from search results
    const uniqueResult = Array.from(new Set(searchResult.map(user => user._id))).map(id => searchResult.find(user => user._id === id));
  
    if (uniqueResult.length > 0) {
      // Sort unique search results by the number of elements found in the keywords array
      const sortedResult = uniqueResult.sort((a, b) => {
        const countA = a.keywords.filter(keyword => term.includes(keyword.toLowerCase())).length;
        const countB = b.keywords.filter(keyword => term.includes(keyword.toLowerCase())).length;
        return countB - countA;
      });
      return res.json(sortedResult);
    } else {
      return res.status(404).json({ error: "Nothing found" });
    }
  };
  
  module.exports = { handleSearch };