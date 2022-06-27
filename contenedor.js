const fs = require('fs');

class Contenedor {

    constructor(textJson) {
        this.textJson = textJson;
        this.data = []
        try {
            this.read()
        } catch (error) {
            this.write()
        }
    }

    read() {
        this.data = JSON.parse(fs.readFileSync(this.textJson));
    }

    write() {
        fs.writeFileSync(this.textJson, JSON.stringify(this.data));
    }
    
    save(obj) {
        obj['id'] = this.data.length + 1;
        obj['timestamp'] = Date.now()
        this.data.push(obj)
        this.write()
    }

    getByID(id) {
        const objID = this.data.find(obj => obj.id == id)
        return objID
    }

    edit(obj){
        const idx = this.data.findIndex(item => item.id == obj.id)
        if (idx < 0)
            return idx     

        this.data[idx] = obj
        this.write()
    }

    getAll() {
        return this.data
    }

    deleteByID(id) {
        const idx = this.data.findIndex(obj => obj.id == id)
        this.data.splice(idx, 1)
        this.write()
    }

    deleteAll() {
        this.data = []
        this.write()
    }

}

module.exports = Contenedor;