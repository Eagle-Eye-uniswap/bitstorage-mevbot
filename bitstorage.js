/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


function bitstorage (table) {
  
  this.autoIncrement = -1;
  this.table = table;
  this.data = null;
  
  if(!localStorage.getItem(table)){
    this.clear();
  }
  
  this.loadFromLocal();
}

bitstorage.prototype.clear = function() {
  this.data = [];
  this.saveToLocal();
};

bitstorage.prototype.saveToLocal = function() {
  localStorage.setItem(this.table, JSON.stringify(this.data));
};

bitstorage.prototype.loadFromLocal = function() {
  this.data = JSON.parse(localStorage.getItem(this.table));
};

bitstorage.prototype.getAll = function() {
  return this.data;
};

bitstorage.prototype.get = function(key) {
  return this.data[key];
};

bitstorage.prototype.find = function(search) {
  var results = [];
  for(var i=0; i<this.data.length; i++) {
    if(this.data[i]){
      for(key in this.data[i]) {
        if(this.data[i][key]==search) {
          results.push(i);
        }
      }
    }
  }
  return results;
};

bitstorage.prototype.findLike = function(search) {
  var results = [];
  for(var i=0; i<this.data.length; i++) {
    if(this.data[i]){
      for(key in this.data[i]) {
        if(this.data[i][key] && typeof this.data[i][key] == 'string'){
          if(this.data[i][key].indexOf(search)!=-1) {
            results.push(i);
          }
        }
      }
    }
  }
  return results;
};

bitstorage.prototype.findByKey = function(key, search) {
  var results = [];
  for(var i=0; i<this.data.length; i++) {
    if(this.data[i] && this.data[i][key]){
      if(this.data[i][key]==search) {
        results.push(i);
      }
    }
  }
  return results;
};

bitstorage.prototype.findByKeyLike = function(key, search) {
  var results = [];
  for(var i=0; i<this.data.length; i++) {
    if(this.data[i] && this.data[i][key] && typeof this.data[i][key] == 'string'){
      if(this.data[i][key].indexOf(search)!=-1) {
        results.push(i);
      }
    }
  }
  return results;
};

bitstorage.prototype.insert = function(val) {
  this.autoIncrement++;
  this.data[this.autoIncrement] = val;
  this.saveToLocal();
  
  return this.autoIncrement;
};

bitstorage.prototype.update = function(key, val) {
  this.data[key] = val;
  this.saveToLocal();
  
  return key;
};

bitstorage.prototype.delete = function(key) {
  delete this.data[key];
};



