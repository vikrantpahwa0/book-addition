const { Book } = require("../models"); 

class BookService {
  static async addBook(title, author, year, userId) {
    try {
    const createdBook = await Book.create({ title, author, year,createdBy:userId });
    return {id:createdBook.id}        
    } catch (error) {
        throw new Error(error.message)
    }    
  }

  static async deleteBook(id,userId) {
    try {
    const bookExists = await Book.findOne({where:{id,createdBy:userId}});
    if(!bookExists){
      throw new Error("Book Not found or Invalid book deletion request")
    }
    await Book.destroy({ where: { id } });
    return true       
    } catch (error) {
        throw new Error(error.message)
    }    
  }

  static async getBooks(userId) {
    try {
    return await Book.findAll({where:{createdBy:userId}});   
    } catch (error) {
        throw new Error(error.message)
    }    
  }

  static async editBook(body,userId) {
    try {
    const bookExists = await Book.findOne({where:{id,createdBy:userId}});
    if(!bookExists){
      throw new Error("Book Not found or Invalid book updation request")
    }
    await Book.update({ where: { id } },{...body});
    return true       
    } catch (error) {
        throw new Error(error.message)
    }    
  }
}

module.exports = BookService;
