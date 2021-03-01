import axios from 'axios'
import toast from 'react-hot-toast'
import { LOAD_GOUV_API, LOAD_GOUV_API_SUCCESS, LOAD_GOUV_API_ERROR } from './typeGouvData'

export const loadGouvApi = () => {
  return {
    type: LOAD_GOUV_API,
  }
}
export const loadGouvApiSuccess = (borders) => {
  return {
    type: LOAD_GOUV_API_SUCCESS,
    payload: borders,
  }
}
export const loadGouvApiError = (errorMessage) => {
  return {
    type: LOAD_GOUV_API_ERROR,
    payload: errorMessage,
  }
}

export const gouvApiCall = (param, searchValue) => {
  return (dispatch) => {

    dispatch(loadGouvApi())

    // axios.get(`https://sismo-api.vercel.app/api/v1/city/${param}/${searchValue.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace("'"," ").toUpperCase().replace("SAINT","ST").replace("SAINTE","STE").split('-').join(' ')}`)
    axios.get(`http://localhost:8000/api/v1/city/${param}/${searchValue.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace("'"," ").toUpperCase().replace("SAINT","ST").replace("SAINTE","STE").split('-').join(' ')}`)
    .then((res) => {

      if (res.data[0] !== "Limite du nombre de résultats atteint. Merci de préciser votre recherche.") {
        const border = []
  
        for (let i = 0; i < res.data.length; i++) {
            axios.get(`https://geo.api.gouv.fr/communes?code=${res.data[i].insee}&fields=contour`)
            .then((dataGouv) => {
          
              if (dataGouv.data[0] !== undefined) {
                const obj = {
                  "border": dataGouv.data[0].contour !== undefined ? dataGouv.data[0].contour : '-',
                }
                border.push(obj.border)
                if (i === (res.data.length)-1) {
                  dispatch(loadGouvApiSuccess(border))
                }
              } else {
                const obj = {
                  "border": '-',
                }
                border.push(obj.border)
                if (i === (res.data.length)-1) {
                  dispatch(loadGouvApiSuccess(border))
                }
              }
            })
        }
      } else {
        toast.error(`Impossible d'afficher des frontières. Limite du nombre de résultats atteint. Merci de préciser votre recherche.`, {
          duration: 5000,
          style: {
            background: '#e57373',
            color: '#FFFFFF',
          },
          iconTheme: {
            primary: '#b71c1c',
            secondary: '#FFFFFF'
          },
        })
      }

    })
    .catch((err) => {
        dispatch(loadGouvApiError(err.message))
        console.log(err.message)
        
        toast.error(err.message, {
          duration: 5000,
          style: {
            background: '#e57373',
            color: '#FFFFFF',
          },
          iconTheme: {
            primary: '#b71c1c',
            secondary: '#FFFFFF'
          },
        });
    });
  }
}