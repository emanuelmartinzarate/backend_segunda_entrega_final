
class ContenedorMemoria {

    constructor() {
        this.data = []
    }
    
    async save(obj) {
        obj['id'] = this.data.length + 1;
        obj['timestamp'] = Date.now()
        this.data.push(obj)
        return obj
    }

    async getByID(id) {
        const objID = this.data.find(obj => obj.id == id)
        return objID
    }

    async edit(obj){
        const idx = this.data.findIndex(item => item.id == obj.id)
        if (idx < 0)
            return idx     

        this.data[idx] = obj
        return obj
    }

    async getAll() {
        return this.data
    }

    async deleteByID(id) {
        const idx = this.data.findIndex(obj => obj.id == id)
        this.data.splice(idx, 1)
    }

    async deleteAll() {
        this.data = []
    }

}

module.exports = ContenedorMemoria;