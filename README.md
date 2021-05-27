# object-observer
observing an object, a proxy alternative for vanilla javascript


//this the way to instantiate it.

let obj = {};
const observer = new Scope(obj, {
    trap(k){
        if (k == 'name'){
            return 'my name is Cedrick';
        };
        return false;
    },
    notify(m){
        console.log(m);
    },
});


by default, the observer key is named $scope, you can access it using the pKey upon instantiation.
const observer = new Scope(obj, {
  pKey:'watch',
});


then your observer is good to go.

obj.watcher.name = 'James'; //will notify,
