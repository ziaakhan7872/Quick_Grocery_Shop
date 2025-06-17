import { openDatabase } from 'react-native-sqlite-storage';
import Toast from 'react-native-simple-toast';
import { newEvents } from './CustomListner';

const db = openDatabase(
  { name: 'Grocery.db', location: 'default' }, // ✅ remove createFromLocation
  () => {
    console.log('✅ Database OPENED');
    createCartTable(); // ✅ call table creation here
  },
  err => {
    console.log('❌ DB open error:', err);
  }
);

// ✅ Create the cartTable if it doesn't exist
const createCartTable = () => {
  db.transaction(tx => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS cartTable (
        Productid INTEGER PRIMARY KEY NOT NULL,
        ImageUrl TEXT,
        ProductName TEXT,
        quantity INTEGER,
        Price REAL,
        TotalQuantity INTEGER
      );`,
      [],
      () => {
        console.log('✅ cartTable ready');
      },
      error => {
        console.log('❌ Error creating cartTable:', error);
      }
    );
  });
};

export const addTOcart = (
  Productid,
  ImageUrl,
  ProductName,
  quantity,
  Price,
  TotalQuantity
) => {
  return new Promise((resolve, reject) => {
    try {
      db.transaction(tx => {
        tx.executeSql(
          'SELECT * FROM cartTable WHERE Productid = ?',
          [Productid],
          (tx, results) => {
            if (results.rows.length > 0) {
              const newQuantity = results.rows.item(0).quantity + quantity;
              tx.executeSql(
                'UPDATE cartTable SET quantity = ? WHERE Productid = ?',
                [newQuantity, Productid],
                () => {
                  console.log('✅ Item updated');
                  newEvents.emit('addCart', 'addCart');
                  resolve(); // ✅ RESOLVE after update
                },
                err => {
                  console.log('❌ Update error', err);
                  reject(err);
                }
              );
            } else {
              tx.executeSql(
                'INSERT INTO cartTable(Productid, ImageUrl, ProductName, quantity, Price, TotalQuantity) VALUES (?,?,?,?,?,?)',
                [Productid, ImageUrl, ProductName, quantity, Price, TotalQuantity],
                () => {
                  console.log('✅ Item inserted');
                  newEvents.emit('addCart', 'addCart');
                  resolve(); // ✅ RESOLVE after insert
                },
                err => {
                  console.log('❌ Insert error', err);
                  reject(err);
                }
              );
            }
          },
          error => {
            console.log('❌ Select error', error);
            reject(error);
          }
        );
      });
    } catch (error) {
      console.log('❌ Transaction error', error);
      reject(error);
    }
  });
};




// import { openDatabase } from 'react-native-sqlite-storage';
// import Toast from 'react-native-simple-toast';
// import { useDispatch, useSelector } from 'react-redux';
// import { AddtoCart } from '../Redux/Actions/Actions';
// import { newEvents } from './CustomListner';

// const db = openDatabase(
//   { name: 'Grocery.db', createFromLocation: 1 },
//   successCB,
//   errorCB,
//   openCB,
// );

// const errorCB = err => {
//   console.log('SQL Error: ' + err);
// };

// const successCB = () => {
//   console.log('SQL executed fine');
// };
// const openCB = () => {
//   console.log('Database OPENED');
// };

// export const addTOcart = (
//   Productid,
//   ImageUrl,
//   ProductName,
//   quantity,
//   Price,
//   TotalQuantity,
// ) => {
//   // const dispatch = useDispatch();
//   // dispatch(AddtoCart(10))

//   console.log('dataaaa=====', {
//     Productid,
//     ImageUrl,
//     ProductName,
//     quantity,
//     Price,
//     TotalQuantity,
//   });


//   try {

//     db.transaction(function (tx) {
//       // Check if the Productid already exists in the database
//       tx.executeSql(
//         'SELECT * FROM cartTable WHERE Productid = ?',
//         [Productid],
//         (tx, results) => {
//           if (results.rows.length > 0) {
//             // If the item already exists, update the quantity
//             const newQuantity = results.rows.item(0).quantity + quantity;
//             tx.executeSql(
//               'UPDATE cartTable SET quantity = ? WHERE Productid = ?',
//               [newQuantity, Productid],
//               (tx, results) => {
//                 console.log('Item quantity updated in cartTable', results);
//                 //  navigation.navigate('AddCart');
//                 // Toast.showWithGravity(
//                 //   'The product has been successfully added to your cart 🛒.',
//                 //   Toast.LONG,
//                 //   Toast.TOP,
//                 // );
//               },
//               error => {
//                 console.log('Error updating item quantity in cartTable', error);
//               },
//             );
//           } else {
//             // If the item does not exist, insert a new row into the cartTable
//             tx.executeSql(
//               'INSERT INTO cartTable(Productid, ImageUrl, ProductName, quantity, Price, TotalQuantity) VALUES (?,?,?,?,?,?)',
//               [Productid, ImageUrl, ProductName, quantity, Price, TotalQuantity],
//               (tx, results) => {
//                 console.log('New item added to cartTable', results);
//                 // navigation.navigate('AddCart');
//                 // Toast.show(
//                 //   'The product has been successfully added to your cart 🛒.',
//                 //   Toast.LONG,
//                 // );
//               },
//               error => {
//                 console.log('Error inserting new item into cartTable', error);
//               },
//             );
//           }
//         },
//         error => {
//           console.log('Error selecting item from search cartTable', error);
//         },
//       );
//     });

//     newEvents.emit('addCart', 'addCart')
//   } catch (error) {
//     console.log('Error in transaction', error);
//   }
// };
