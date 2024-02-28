(function(){
    'use strict';
    class Loader {
        constructor(){
            //очередь для загрузки
            this.loadOrder={
                images:[],
                jsons:[]
            }
            //ссылки на уже загруженные ресурсы
            this.resources={
                images:[],
                jsons:[]
            }
        }
        //добавление фотографии в очередь на загрузку
        addImage(name, src){
            this.loadOrder.images.push({name, src})
        }
        //добавление json file в загрузку на очередь
        addJson(name, address){
            this.loadOrder.jsons.push({name, address})
        }
        //получение картинки которую по имени запросили
        getImage(name){
            return this.resources.images[name];
        }
        //получение данных по названию которые мы запросили и у которые уже не в очереди, а в ресурсах
        getJson(name){
            return this.resources.jsons[name];

        }
        //загружение данных в ресусры и удаляем из очереди
        load (callback){
            const promises=[]
            for (const imageData of this.loadOrder.images ){
                const {name, src}=imageData;
                const promise=Loader.loadImage(src)
                .then(image=>{
                    this.resources.images[name]=image;
                    if (this.loadOrder.images.includes(imageData)){
                        const index=this.loadOrder.images.indexOf(imageData);
                        this.loadOrder.images.splice(index,1);
                    }
                })
                promises.push(promise)
                }
            
            for (const jsonData of this.loadOrder.jsons ){
                const {name, address}=jsonData;
                const promise=Loader.loadJson(address)
                .then(json=>{
                    this.resources.jsons[name]=json;
                    if (this.loadOrder.jsons.includes(jsonData)){
                        const index=this.loadOrder.jsons.indexOf(jsonData);
                        this.loadOrder.jsons.splice(index,1);
                    }
                })
                promises.push(promise)
                }
            Promise.all(promises).then(()=>callback())
        }
        // получение одной фотографии по адресу с сервера из статического метода
        static loadImage (src){
            return new Promise(function(resolve, reject){
                try{
                    const image=new Image;
                    image.onload=function(){
                        resolve(image);
                    }
                    image.src=src; 

                }catch(err){
                    reject(err);
                }
            })
        }
        //получение одного json по адресу с сервера из статического метода,json file load with help FETCH
        static loadJson(address){
            return new Promise(function(resolve, reject){
                fetch(address).then(result=>result.json()
                ).then(result=>resolve(result)).catch(err=>reject(err))
            })
        }

    }
    window.GameEngine=window.GameEngine || {};
    window.GameEngine.Loader=Loader;
})();