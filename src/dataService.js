
export default class DataService {

    _URL = "https://tz-app-33e40-default-rtdb.firebaseio.com";
  
    async getData(url) {
        const response = await fetch(`${this._URL}/${url}.json`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        });

        const data = await response.json();
        if(data){
            const arr = Object.keys(data).map((key) => ({ ...data[key], id: key }));
            return arr;
        }
        else{
            return [];
        }
    }

    async create(body,url) {
        const res = await fetch(`${this._URL}/${url}.json`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
          }
        );
        if (!res.ok) {
          throw new Error(`Could not fetch, received ${res.status}`);
        }
        const content = await res.json();
        return content;
    }

    async delete(id, url) {
        const res = await fetch(`${this._URL}/${url}/${id}.json`,
          {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
          }
        );
        if (!res.ok) {
          throw new Error(`Could not fetch , received ${res.status}`);
        }
        const content = await res.json();
        return content;
    }

    async update(id, url, fullName, email, age) {
        const res = await fetch(`${this._URL}/${url}/${id}.json`,
          {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({fullName, email, age})
          }
        );
        if (!res.ok) {
          throw new Error(`Could not fetch , received ${res.status}`);
        }
        const content = await res.json();
        return content;
    }

    /*********************************************************/
  
    async getUsers(){
      const res = await this.getData('Users');
      return res;
    }

    async createUser(body){
        const res = await this.create(body,'Users')
        return res;
    }

    async deleteUser(id){
        const res = await this.delete(id,'Users')
        return res;
    }

    async updateUser(id, fullName, email, age){
        const res = await this.update(id,'Users', fullName, email, age)
        return res;
    }
}