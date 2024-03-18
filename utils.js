const verifyQuestion = (nom,prenom,age)=>{
    if(nom =="" || prenom=="" || age =="")
        return {state:false, msg:"tous les champs sont obligatoires"}
    if(nom.length<3)
        return {state:false, msg:"nom minimum 3 caracters"}
    if(prenom.length<3)
        return  {state:false, msg:"prenom minimum 3 caracters"}

    if(age <= 0 || age >=120)
        return  {state:false, msg:"age must be between 1 and 120"}

    return {state:true, msg:""}
}
const middlewareVerification  = (req,res,next)=>{
    // refaire la verification
    let {nom,prenom,age} = req.body
    let {state,msg} = verifyQuestion(nom,prenom,age)
    if(state)
        return next()
    res.status(400).send(msg)
}
module.exports={
    verifyQuestion,
    middlewareVerification
}