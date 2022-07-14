
class ContenedorMemory {

    constructor() {
        this.data = []
    }
    
    save(obj) {
        obj['id'] = this.data.length + 1;
        obj['timestamp'] = Date.now()
        this.data.push(obj)
        return obj
    }

    getByID(id) {
        const objID = this.data.find(obj => obj.id == id)
        return objID
    }

    edit(obj){
        const idx = this.data.findIndex(item => item.id == obj.id)
        if (idx < 0)
            return this.data[idx]     

        this.data[idx] = obj
        return this.data[idx]
    }

    getAll() {
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

module.exports = ContenedorMemory;