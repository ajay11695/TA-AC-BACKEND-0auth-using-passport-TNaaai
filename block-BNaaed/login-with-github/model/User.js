var mongoose=require('mongoose')
var bcrypt=require('bcrypt')
var Schema=mongoose.Schema


var UserSchema=new Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,minlength:5},
    username:{type:String},
    photo:String
  
},{
    timestamps:true
})

UserSchema.pre('save',function(next){
    // this is refer mongoose database and show before from add database
    console.log(this)
    if(this.email === 'ajayrajput9554@gmail.com'){
        this.isAdmin=true
    }
    if(this.password && this.isModified('password')){
        bcrypt.hash(this.password,10,(err,hashed)=>{
            if(err)return next(err)
            this.password=hashed
            return next()
        })
    }else{
        return next()
    }
})

// method

UserSchema.methods.verifyPassword=function(password,cb){
    bcrypt.compare(password, this.password ,(err,result)=>{
        return cb(err,result)
    })
}

var User=mongoose.model('User',UserSchema)
module.exports=User