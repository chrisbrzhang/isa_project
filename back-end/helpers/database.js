const con = require('../connection');

exports.checkIfUserExists = async (email) => {
  let query = `SELECT * FROM User WHERE Email = '${email}';`;
  let arr = [];
    
  await con.promise(query)
  .then((result) => {
    if (result.length === 0) {
      arr = [false, "There is no user with that email."];
    } else {
      arr = [true, result[0]];
    }
  })
  .catch((error) => {
    console.log(error.message);
    arr = [false, error.message];
  });
  return arr;
}

exports.checkIfRecipeAlreadySaved = async (userId, recipeId) => {
  let query = `SELECT * FROM SavedRecipe WHERE UserId = '${userId}' AND RecipeId = ${recipeId};`;
  let arr = [true, ""];
    
  await con.promise(query)
  .then((result) => {
    if (result.length === 0) {
      arr = [false, "This recipe is not already saved."];
    } else {
      arr = [true, "This recipe has already been saved."];
    }
  })
  .catch((error) => {
    console.log(error.message);
  });
  return arr;
}

exports.checkIfIdExistsInTable = async (id, table) => {
  console.log(table);

  let query = `SELECT * FROM ${table} WHERE Id = ${id};`;
  let msg = [false, ""];
    
  await con.promise(query)
  .then((result) => {
    if (result.length > 0) {
      msg = [true, result[0]];
    }
  })
  .catch(error => {
    console.log(error.message);
  });
  return msg;
}

exports.checkUserToken = async (id, token) => {
  // console.log(table);

  let query = `SELECT * FROM User WHERE Id = ${id} AND Token = '${token}';`;
  let msg = [false, ""];
    
  await con.promise(query)
  .then((result) => {
    if (result.length > 0) {
      msg = [true, result[0]];
    }
  })
  .catch(error => {
    console.log(error.message);
  });
  return msg;
}

exports.updateUser = async (id, newpassword, table) => {
  let msg = [false, ""]
  bcrypt.hash(newpassword, SALTS, async (_, hash) => {

  const query = `UPDATE ${table} SET Password='${hash}' WHERE Id=${id};`;
  await con.promise(query)
  .then((result) => {
    console.log(result)
    msg = [true, "New password saved"]
  }).catch(err => {
    msg = [false, err]
    })
  })
  return msg;
}