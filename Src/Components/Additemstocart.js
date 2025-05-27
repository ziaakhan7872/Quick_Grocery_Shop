import { openDatabase } from 'react-native-sqlite-storage';
import Toast from 'react-native-simple-toast';
import { useDispatch, useSelector } from 'react-redux';
import { AddtoCart } from '../Redux/Actions/Actions';
import { newEvents } from './CustomListner';

const db = openDatabase(
  { name: 'Grocery.db', createFromLocation: 1 },
  successCB,
  errorCB,
  openCB,
);

const errorCB = err => {
  console.log('SQL Error: ' + err);
};

const successCB = () => {
  console.log('SQL executed fine');
};
const openCB = () => {
  console.log('Database OPENED');
};

export const addTOcart = (
  Productid,
  ImageUrl,
  ProductName,
  quantity,
  Price,
  TotalQuantity,
) => {
  // const dispatch = useDispatch();
  // dispatch(AddtoCart(10))

  console.log('dataaaa=====', {
    Productid,
    ImageUrl,
    ProductName,
    quantity,
    Price,
    TotalQuantity,
  });


  try {

    db.transaction(function (tx) {
      // Check if the Productid already exists in the database
      tx.executeSql(
        'SELECT * FROM cartTable WHERE Productid = ?',
        [Productid],
        (tx, results) => {
          if (results.rows.length > 0) {
            // If the item already exists, update the quantity
            const newQuantity = results.rows.item(0).quantity + quantity;
            tx.executeSql(
              'UPDATE cartTable SET quantity = ? WHERE Productid = ?',
              [newQuantity, Productid],
              (tx, results) => {
                console.log('Item quantity updated in cartTable', results);
                //  navigation.navigate('AddCart');
                // Toast.showWithGravity(
                //   'The product has been successfully added to your cart 🛒.',
                //   Toast.LONG,
                //   Toast.TOP,
                // );
              },
              error => {
                console.log('Error updating item quantity in cartTable', error);
              },
            );
          } else {
            // If the item does not exist, insert a new row into the cartTable
            tx.executeSql(
              'INSERT INTO cartTable(Productid, ImageUrl, ProductName, quantity, Price, TotalQuantity) VALUES (?,?,?,?,?,?)',
              [Productid, ImageUrl, ProductName, quantity, Price, TotalQuantity],
              (tx, results) => {
                console.log('New item added to cartTable', results);
                // navigation.navigate('AddCart');
                // Toast.show(
                //   'The product has been successfully added to your cart 🛒.',
                //   Toast.LONG,
                // );
              },
              error => {
                console.log('Error inserting new item into cartTable', error);
              },
            );
          }
        },
        error => {
          console.log('Error selecting item from cartTable', error);
        },
      );
    });

    newEvents.emit('addCart', 'addCart')
  } catch (error) {
    console.log('Error in transaction', error);
  }
};
