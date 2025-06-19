import axios from 'axios'
// logggg

// // export const BASE_URL1 = 'http://192.168.20.191:5001/products/'
// // export const BASE_URL = 'http://ec2-18-237-149-141.us-west-2.compute.amazonaws.com:5000/'
// export const BASE_URL = "https://prod-api.quick.shop/products/"
// export const BASE_URL_PATCH = "https://prod-api.quick.shop/auth/"
// export const ADMIN_BASE_URL = 'https://prod-api.quick.shop/admins/'
// // export const BASE_AUTHURL = "http://192.168.20.191:8082/auth/"
// export const BASE_AUTHURL = "https://prod-api.quick.shop/auth/"
// export const BASE_NOTIFICATIONURL = "https://prod-api.quick.shop/admins/"
// // export const BASE_ADMIN = 'http://ec2-35-88-253-186.us-west-2.compute.amazonaws.com:8083'



//New UrL

// export const BASE_URL1 = 'http://192.168.20.191:5001/products/'
// export const BASE_URL = 'http://ec2-18-237-149-141.us-west-2.compute.amazonaws.com:5000/'
export const BASE_URL = "https://api.quick-shop.pk/products/"
export const BASE_URL_PATCH = "https://api.quick-shop.pk/auth/"
export const ADMIN_BASE_URL = 'https://api.quick-shop.pk/admins/'
// export const BASE_AUTHURL = "http://192.168.20.191:8082/auth/"
export const BASE_AUTHURL = "https://api.quick-shop.pk/auth/"
export const BASE_NOTIFICATIONURL = "https://api.quick-shop.pk/admins/"
// export const BASE_ADMIN = 'http://ec2-35-88-253-186.us-west-2.compute.amazonaws.com:8083'



export const _axiosPostAPI = (url, params) => {
  return new Promise((resolve, reject) => {

    try {
      axios({
        method: 'post',
        url: BASE_URL + url,
        data: params,
        headers: {
          'accept': 'application/json',
          'content-Type': 'application/json'
        },
      })
        .then(async (response) => {
          resolve(response)
        })
        .catch((err) => {
          reject(err.response)

        })
    } catch (error) {
      reject(error)
    }
  })
}


export const UploadRecieptApi = async (id, formData, token) => {
  return new Promise((resolve, reject) => {

    try {
      axios({
        method: "patch",
        url: BASE_URL + `/orders/${id}/transaction-receipt`,
        data: formData,
        headers: {
          Authorization: "Bearer " + token,
        },
      })
        .then(async (response) => {
          resolve(response)
        })
        .catch((err) => {
          reject(err.response)

        })
    } catch (error) {
      reject(error)
    }
  })
}
export const _axiosPostAPIAUTH = (url, params) => {
  return new Promise((resolve, reject) => {
    console.log("BASE_AUTHURL + url", BASE_AUTHURL + url);

    axios({
      method: 'POST',
      url: BASE_AUTHURL + url,
      data: params,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    })
      .then(response => {
        resolve(response);
      })
      .catch(error => {
        reject(error); // ✅ Always pass the full error object
      });
  });
};


export const DeleteUserAxious = (url, token) => {
  return new Promise((resolve, reject) => {

    try {
      axios({
        method: 'delete',
        url: BASE_AUTHURL + url,
        // data: params,
        headers: {
          'accept': 'application/json',
          'content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
      })
        .then(async (response) => {
          resolve(response)
        })
        .catch((err) => {
          reject(err.response)

        })
    } catch (error) {
      reject(error)
    }
  })
}



// 


export const _axiosGetAPI = (url, yes) => {

  return new Promise((resolve, reject) => {
    try {


      axios({
        method: 'GET',
        url: BASE_URL + url,
      })
        .then((response) => {
          resolve(response)
        })
        .catch((err) => {
          reject(err.response.data)
        })
    } catch (error) {
      reject(error)
    }
  })


}
export const _axiosGetAPI11111 = (url, yes) => {

  return new Promise((resolve, reject) => {
    try {

      if ("https://prod-api.quick.shop/products/store/products?offset=1&limit=50&categoryName=Breakfast%20%26%20Bakery&filter=brandId=in:[13];isPublish=eq:true" != BASE_URL + url) {
      } else {
      }
      axios({
        method: 'GET',
        url: BASE_URL + url,
      })
        .then((response) => {
          resolve(response)
        })
        .catch((err) => {
          reject(err.response.data)
        })
    } catch (error) {
      reject(error)
    }
  })


}

export const _axiosGetAPI1 = (url) => {
  return new Promise((resolve, reject) => {
    try {
      axios({
        url: url,
        method: 'GET',
      })
        .then((response) => {
          resolve(response)
        })
        .catch((err) => {
          reject(err.response.data)
        })
    } catch (error) {
      reject(error)
    }
  })
}
export const _axiosGetAPITesting = (url) => {
  return new Promise((resolve, reject) => {
    try {
      axios({
        url: BASE_URL1 + url,
        method: 'GET',
      })
        .then((response) => {
          resolve(response)
        })
        .catch((err) => {
          reject(err.response.data)
        })
    } catch (error) {
      reject(error)
    }
  })
}


export const _axiosGetAPIAUTH = (url) => {
  return new Promise((resolve, reject) => {
    try {
      axios({
        url: BASE_AUTHURL + url,
        method: 'GET',
      })
        .then((response) => {
          resolve(response)
        })
        .catch((err) => {
          reject(err.response.data)
        })
    } catch (error) {
      reject(error)
    }
  })
}




// +++++=========


export const _AxiosGetBearer = (url, token) => {
  return new Promise((resolve, reject) => {
    console.log("mystery url",BASE_URL + url)
    try {
      axios({
        url: BASE_URL + url,
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + token,
        },
      })
        .then((response) => {
          resolve(response.data)
        })
        .catch((err) => {
          reject(err)
        })
    } catch (error) {
      reject(error)
    }
  })
}
export const _AxiosGetBearerAdmin = (url, token) => {
  return new Promise((resolve, reject) => {
    try {
      axios({
        url: ADMIN_BASE_URL + url,
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + token,
        },
      })
        .then((response) => {
          resolve(response.data)
        })
        .catch((err) => {
          reject(err)
        })
    } catch (error) {
      reject(error)
    }
  })
}

export const _AxiosGetBearerAUTH = (url, token) => {
  return new Promise((resolve, reject) => {
    console.log("order history api ",BASE_AUTHURL + url)
    try {
      axios({
        url: BASE_AUTHURL + url,
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + token,
        },
      })
        .then((response) => {
          resolve(response.data)
        })
        .catch((err) => {
          reject(err)
        })
    } catch (error) {
      reject(error)
    }
  })
}

export const UserTokenVerification = (token) => {
  return new Promise((resolve, reject) => {
    try {
      axios({
        url: 'https://prod-api.quick.shop/auth/users/check-token',
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + token,
        },
      })
        .then((response) => {
          resolve(response.data)
        })
        .catch((err) => {
          console.log("this is error", err);

          reject(err)
        })
    } catch (error) {
      console.log("this is error", error);

      reject(error)
    }
  })
}
export const _AxiosGetBearerNotification = (url, token) => {
  return new Promise((resolve, reject) => {
    try {
      axios({
        url: BASE_NOTIFICATIONURL + url,
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + token,
        },
      })
        .then((response) => {
          resolve(response.data)
        })
        .catch((err) => {
          reject(err)
        })
    } catch (error) {
      reject(error)
    }
  })
}




// +++++++========
export const _AxiosDeleteBearer = (url, token) => {
  return new Promise((resolve, reject) => {
    try {
      axios({
        url: BASE_URL + url,
        method: 'DELETE',
        headers: {
          Authorization: 'Bearer ' + token,
        },
      })
        .then((response) => {
          resolve(response)
        })
        .catch((err) => {
          reject(err)
        })
    } catch (error) {
      reject(error)
    }
  })
}
export const _axiosdeleteAPIAUTH = (url, token) => {
  return new Promise((resolve, reject) => {
    try {
      axios({
        url: BASE_AUTHURL + url,
        method: 'DELETE',
        headers: {
          Authorization: 'Bearer ' + token,
        },
      })
        .then((response) => {
          resolve(response)
        })
        .catch((err) => {
          reject(err)
        })
    } catch (error) {
      reject(error)
    }
  })
}


// ++++++++++++

/**
 * Sends a POST request with Bearer Token authentication
 * @param {string} url - API endpoint (relative to BASE_URL)
 * @param {Object} param - POST body data
 * @param {string} token - Bearer token for Authorization header
 * @returns {Promise<Object>} - Resolves with response data or rejects with error
 */
export const _PostBearer = (url, param = {}, token = '') => {
  return new Promise(async (resolve, reject) => {
    if (!url || typeof url !== 'string') {
      return reject(new Error('Invalid URL parameter.'));
    }

    if (!token || typeof token !== 'string') {
      return reject(new Error('Missing or invalid Bearer token.'));
    }
// console.log("this is url",  url);
    try {
      const response = await axios({
        method: 'POST',
        url: BASE_URL + url,
        data: param,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        timeout: 30000, // 15s timeout (optional)
      });

      resolve(response.data);
    } catch (error) {
      // Axios error handling
      console.log("error. response", error.response)
      if (error.response) {
        // Server responded with a status other than 2xx
        console.error('🚨 Server error:', error.response.status, error.response.data);
        reject({
          type: 'server',
          status: error.response.status,
          data: error.response.data,
        });
      } else if (error.request) {
        // Request was made but no response received
        console.error('📡 Network error: No response received');
        reject({
          type: 'network',
          message: 'No response received from server',
        });
      } else {
        // Something else went wrong
        console.error('❌ Unexpected error:', error.message);
        reject({
          type: 'unknown',
          message: error.message,
        });
      }
    }
  });
};



export const _PostBearerAUTH = (url, param, token) => {
  console.log(url, param, token);

  return new Promise((resolve, reject) => {
    try {
      axios({
        method: 'POST',
        url: BASE_AUTHURL + url,
        data: param,
        headers: {
          Authorization: 'Bearer ' + token,
        },
      })
        .then(async (response) => {
          console.log("responseresponse", response);

          resolve(response.data)
        })
        .catch((err) => {
          console.log("errerrerrerrerr", err);

          reject(err)
        })
    } catch (error) {
      console.log("errerrerrerrerr:::::::", err);

      reject(error)
    }
  })
}

// ++++++++++++++++
export const _updateAccountID = (url, data, token) => {
  return new Promise((resolve, reject) => {
    try {
      const config = {
        method: 'POST',
        headers: {
          Authorization: 'Bearer ' + token,
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
        body: data,
      }
      fetch(BASE_URL + url, config)
        .then((resp) => resp.json())
        .then((response) => {
          resolve(response)
        })
        .catch((err) => {
          reject(err)
        })
    } catch (error) {
      reject(error)
    }
  })
}
export const _updateProfile = (data, token) => {
  return new Promise((resolve, reject) => {
    try {
      const config = {
        method: 'PATCH',
        headers: {
          Authorization: 'Bearer ' + token,
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
        body: data,
      }
      fetch(BASE_AUTHURL + 'users/profile', config)
        .then((resp) => resp.json())
        .then((response) => {
          resolve(response)
        })
        .catch((err) => {
          reject(err)
        })
    } catch (error) {
      reject(error)
    }
  })
}





export const uploadtransectionrecipt = (data, id, token) => {
  return new Promise((resolve, reject) => {
    try {
      const config = {
        method: 'PATCH',
        headers: {
          Authorization: 'Bearer ' + token,
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
        body: data,
      }
      fetch(BASE_URL + `orders/${id}/transaction-receipt`, config)
        .then((resp) => resp.json())
        .then((response) => {
          resolve(response)
        })
        .catch((err) => {
          reject(err)
        })
    } catch (error) {
      reject(error)
    }
  })
}
// *********
export const _axiosPatchApiAUTH = (url, param, token) => {
  return new Promise((resolve, reject) => {
    try {
      axios({
        method: 'PATCH',
        url: BASE_AUTHURL + url,
        data: param,
        headers: {
          Authorization: 'Bearer ' + token,
        },
      })
        .then(async (response) => {
          resolve(response.data)
        })
        .catch((err) => {
          reject(err)
        })
    } catch (error) {
      reject(error)
    }
  })
}

// export const _axiosMysteryBoxId = (url, token,param) => {
//   return new Promise((resolve, reject) => {
//     console.log("base url", BASE_URL + url,token,param)
//     try {
//       axios({
//         method: 'PATCH',
//         url: BASE_URL + url,
//         data:param,
//         headers: {
//           Authorization: 'Bearer ' + token,
//         },
//       })
//         .then(async (response) => {
//           resolve(response.data)
//         })
//         .catch((err) => {
//           reject(err)
//         })
//     } catch (error) {
//       reject(error)
//     }
//   })
// }

export const _axiosPatchApiNOTIFICATION = (url, param, token) => {
  return new Promise((resolve, reject) => {
    try {
      axios({
        method: 'PATCH',
        url: BASE_NOTIFICATIONURL + url,
        data: param,
        headers: {
          Authorization: 'Bearer ' + token,
        },
      })
        .then(async (response) => {
          resolve(response.data)
        })
        .catch((err) => {
          reject(err)
        })
    } catch (error) {
      reject(error)
    }
  })
}


export const _axiosPatchApi = (url, param, token) => {
  return new Promise((resolve, reject) => {
    console.log("fcm",BASE_URL_PATCH + url)
    try {
      axios({
        method: 'PATCH',
        url: BASE_URL_PATCH + url,
        data: param,
        headers: {
          Authorization: 'Bearer ' + token,
        },
      })
        .then(async (response) => {
          resolve(response.data)
        })
        .catch((err) => {
          console.log("errors", err)
          reject(err)
        })
    } catch (error) {
      reject(error)
    }
  })
}

// *********
export const _axiosPatApi = (url, data, token,) => {

  return new Promise((resolve, reject) => {

    data = JSON.stringify(data)
    try {
      const config = {
        method: 'PATCH',
        headers: {
          Authorization: 'Bearer ' + token,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: data,
      }
      fetch(BASE_URL + url, config)
        .then((resp) => resp.json())
        .then((response) => {
          resolve(response)
        })
        .catch((err) => {
          reject(err)
        })
    } catch (error) {
      reject(error)
    }
  })
}

// export const Tokenization = (url, data ,token) => {
//   return new Promise((resolve, reject) => {

//     try {
//       const config = {
//         method: 'PATCH',
//         headers: {
//           Authorization: 'Bearer ' + token,
//           Accept: 'application/json',
//           'Content-Type': 'multipart/form-data',
//         },
//         body: data,
//       }
//       fetch(BASE_URL + url, config)
//         .then((resp) => resp.json())
//         .then((response) => {
//           resolve(response)
//         })
//         .catch((err) => {
//           reject(err)
//         })
//     } catch (error) {
//       reject(error)
//     }
//   })
// }

export const getCategaryMinimal = async (setLoading, setminimalCategary, callback) => {
  try {
    setLoading(true);
    await _axiosGetAPI('store/categories/minimal?limit=300&offset=1')
      .then(async response => {
        setminimalCategary(response?.data?.data?.categories);
        setLoading(false);
        callback(response?.data?.data?.categories)
      })
      .catch(err => {
        setLoading(false);
      });
  } catch (error) {
    console.log((error, "This is api call error"))

    setLoading(false);
  }
};

export const getCategaryMinimalWithProducts = async (setLoading, callback) => {
  try {
    console.log("this is api running");

    setLoading(true);
    await _axiosGetAPI('store/categories/minimal?limit=300&offset=1')
      .then(async response => {
        setLoading(false);
        callback(response?.data?.data?.categories)
      })
      .catch(err => {
        setLoading(false);
      });
  } catch (error) {
    console.log((error, "This is api call error"))
    setLoading(false);
  }
};