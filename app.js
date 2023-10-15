const mongoose = require("mongoose");
const human = require("./personne");
require("dotenv").config();
const uri = process.env.MONGO_URI;
    //Création et enregistrement  d'un modèle 
    (async()=>{
      try{
          await mongoose.connect(uri)
          console.log("connex re");
          const pers=new human({
              name:"Sammba",
              age:22,
              favoritesFoods:["burger"],
          })
          const result=await pers.save()
          console.log(result);
      }catch(error){
          console.log('erreur de connexion');
      }
  })();
  //Création de nombreux enregistrements avec model.create()
  (async()=>{
      try{
          await mongoose.connect(uri)
          console.log("connex re");
          const instances= await human.create([
              {
                  name:"Mary",
                  age:30,
                  favoritesFoods:["pizza","tacos"]
              },
              {
                  name:"John",
                  age:45,
                  favoritesFoods:["thiep","yassa"]
              },
              {
                  name:"woos",
                  age:20,
                  favoritesFoods:["chicken","fish"]
              },
              {
                  name:"oumar",
                  age:18,
                  favoritesFoods:["rice","lentil"]
              },
              {
                  name:"abdou",
                  age:67,
                  favoritesFoods:["fruits","vegetables"]
              }
          ])
          console.log(instances);
      }catch(error){
          console.log('erreur de connexion');
      }
  })();
  //Utilisation model.find() pour rechercher sur la  base de données
  (async()=>{
      try{
          await mongoose.connect(uri)
          console.log("connex re");
          const found= await human.find({name:{$exists:true}})
          console.log(found);
      }catch(error){
          console.log('erreur de connexion');
      }
  })();
  //Utilisez model.findOne() pour renvoyer un seul document correspondant à partir de notre base de données
  (async()=>{
      try{
          await mongoose.connect(uri)
          console.log("connex re");
          const foundP= await human.findOne({favoritesFoods:"thiep"})
          console.log(foundP);
      }catch(error){
          console.log('erreur de connexion');
      }
  })();
  //Utilisez model.findById() pour rechercher la base de données par _id
  (async()=>{
      try{
          await mongoose.connect(uri)
          console.log("connex re");
          const id="652aebbffa4d02a7ba608a5e"
          const foundid= await human.findById(id)
          console.log(foundid);
      }catch(error){
          console.log('erreur de connexion');
      }
  })();
  //Effectuer de nouvelles mises à jour sur un document à l'aide de model.findOneAndUpdate()
  (async()=>{
      try{
          await mongoose.connect(uri)
          console.log("connex re");
          const id="652aebbffa4d02a7ba608a5e"
          const foundid= await human.findOneAndUpdate({_id:id},{$push:{favoritesFoods:"thiou"}},{new:true})
          console.log(foundid);
      }catch(error){
          console.log('erreur de connexion');
      }
  })();
  //Supprimer un document à l'aide de model.findByIdAndRemove
  (async()=>{
      try{
          await mongoose.connect(uri)
          console.log("connex re");
          const id="652aebbffa4d02a7ba608a5e"
          const foundid= await human.findByIdAndRemove(id)
          console.log(foundid);
      }catch(error){
          console.log('erreur de connexion');
      }
  })();
//MongoDB et Mongoose - Supprimez de nombreux documents avec model.remove()
  (async()=>{
      try{
          await mongoose.connect(uri)
          console.log("connex re");
          const foundid= await human.deleteMany({name:"Mary"})
          console.log(foundid);
      }catch(error){
          console.log('erreur de connexion');
      }
  })();
  //Aides aux requêtes de recherche en chaîne pour affiner les résultats de recherche
(async () => {
    try {
        await mongoose.connect(uri);

        // Utilisez .find() pour rechercher des personnes qui aiment les burritos
        const resultats = await human
            .find({ favoritesFoods: "rice" })

            // Utilisez .sort() pour trier par nom (ordre croissant)
            .sort({ name: 1 })

            // Utilisez .limit() pour limiter les résultats à deux documents
            .limit(2)

            // Utilisez .select() pour masquer le champ 'age'
            .select({ age: 0 });

        console.log("Résultats de la recherche :", resultats);
    } catch (erreur) {
        console.log("Erreur de connexion ou de recherche :", erreur);
    }
})();
