import Vue from 'https://cdn.jsdelivr.net/npm/vue@2.7.14/dist/vue.esm.browser.js'

Vue.component("Loader" , {
    template : `
        <div style="display:flex; justify-content:center; align-items :center">
                 <div class="spinner-border text-danger" role="status">
                 <span class="visually-hidden">Loading...</span>
                 </div>
        </div>
                `
})

new Vue({
    el: "#app" ,
    data(){
        return{
            loading : false,
            form : {
                name: "",
                value:""
            },
            contacts : []
        }
    },
    computed: {
        canCreate(){
            return this.form.name.trim() && this.form.value.trim() // agar formda malumot bolmasa card yaratmaydi
        }
    },
    methods :{
        createContact(){
            const {...contact} = this.form;
            this.contacts.push({...contact , id: Date.now() , marked : false}) //  Date.now() unikallikni saqlaydi
            this.form.name = this.form.value =  ""
        } ,
        markContact(id){
            const contact = this.contacts.find(c=> c.id === id)
            contact.marked = true;
        },
        removeContact(id){
            this.contacts = this.contacts.filter(c => c.id !== id)
        }
    },
    async mounted(){
        this.loading = true
        this.contacts =   await request("/api/contacts");
        this.loading = false
    }

})


async function request(url , method = "GET" , data = null) {
    try{
       const headers= {};
       let body;
       if (data) {
        headers["Content-Type"] = "application.json";
        body = JSON.stringify(data);
       }
       const response = await fetch(url , {
        method, 
        headers ,
        body
       }) 
       return await response.json()
    }catch (e){
        console.log("error" , e.message);
    }
}

