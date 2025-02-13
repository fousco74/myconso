/* eslint-disable @typescript-eslint/no-explicit-any */
// import * as moment from 'moment';
import axios from 'axios';
// import * as slug from 'slug';



function transformToDateTime(input: string): string {
  // Extraction des parties de la chaîne
  const year = `20${input.substring(3, 5)}`; // "24" devient "2024"
  const month = input.substring(5, 7); // "11" (mois)
  const day = input.substring(7, 9); // "07" (jour)
  const hour = input.substring(9, 11); // "15" (heure)
  const minute = input.substring(12, 14); // "00" (minute)
  const second = input.substring(14, 16); // "53" (seconde)

  // Format final en YYYY-MM-DD HH:MM:SS
  return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
}



const coreMakeGetRequest = async ({
  baseUrl = '',
  endpoint = '',
  isProtected = false,
  jwtToken = '',
  additionalHeaders = {},
}) => {
  const result = {
    success: false,
    message: '',
    data: null,
  };

  let error = '';

  const urlComplete = baseUrl + endpoint;
  try {
    // Définir les en-têtes de la requête en ajoutant des en-têtes supplémentaires si disponibles
    const headers = {
      ...(isProtected && { Authorization: 'Bearer ' + jwtToken }),
      ...additionalHeaders, // Fusionne les en-têtes supplémentaires
    };

    // Faire la requête GET
    const response = await axios.get(urlComplete, {
      headers: headers,
    });

    // Vérifier la réponse
    if (response.status === 200) {
      const rData = response.data;
      result.success = true;
      result.data = rData.data ?? rData;
    } else {
      error = response.data.message;
    }
  } catch (err : any | unknown) {
    error = err.message;
    if (err.response) {
      error = err.response.data.message;
    }
  }

  // Si une erreur est survenue, mettre à jour le message de résultat
  if (error !== '') {
    result.message = error;
  }

  return result;
};

const coreMakePostRequest = async ({
  baseUrl = '',
  endpoint = '',
  data = {},
  isProtected = false,
  jwtToken = '',
  additionalHeaders = {},
}) => {
  const result = {
    success: false,
    message: '',
    data: null,
  };

  let error = '';

  const urlComplete = baseUrl + endpoint;
  console.log('urlComplete', urlComplete);

  try {
    // Définir les en-têtes de la requête en ajoutant des en-têtes supplémentaires si disponibles
    const headers = {
      'Content-Type': 'application/json', // Par défaut, envoi des données en JSON
      ...(isProtected && { Authorization: 'Bearer ' + jwtToken }),
      ...additionalHeaders, // Fusionne les en-têtes supplémentaires
    };

    // Faire la requête POST avec les données et les en-têtes
    const response = await axios.post(urlComplete, data, {
      headers: headers,
    });

    // Vérifier la réponse
    if (response.status === 200 || response.status === 201) {
      const rData = response.data;
      result.success = true;
      result.data = rData.data ?? rData;
    } else {
      error = response.data.message;
    }
  } catch (err : any | unknown) {
    error = err.message;
    if (err.response) {
      console.log('err.response.data', err.response.data);
      result.data = err.response.data;
      error = err.response.data.message;
    }
  }

  // Si une erreur est survenue, mettre à jour le message de résultat
  if (error !== '') {
    result.message = error;
  }

  return result;
};

const coreMakePutRequest = async ({
  baseUrl = '',
  endpoint = '',
  data = {},
  isProtected = false,
  jwtToken = '',
  additionalHeaders = {},
}) => {
  const result = {
    success: false,
    message: '',
    data: null,
  };

  let error = '';

  const urlComplete = baseUrl + endpoint;
  try {
    // Définir les en-têtes de la requête en ajoutant des en-têtes supplémentaires si disponibles
    const headers = {
      'Content-Type': 'application/json', // Par défaut, envoi des données en JSON
      ...(isProtected && { Authorization: 'Bearer ' + jwtToken }),
      ...additionalHeaders, // Fusionne les en-têtes supplémentaires
    };

    // Faire la requête PUT avec les données et les en-têtes
    const response = await axios.put(urlComplete, data, {
      headers: headers,
    });

    // Vérifier la réponse
    if (response.status === 200 || response.status === 204) {
      const rData = response.data;
      result.success = true;
      result.data = rData.data ?? rData;
    } else {
      error = response.data.message;
    }
  } catch (err :  any | unknown) {
    error = err.message;
    if (err.response) {
      error = err.response.data.message;
    }
  }

  // Si une erreur est survenue, mettre à jour le message de résultat
  if (error !== '') {
    result.message = error;
  }

  return result;
};

const coreMakePatchRequest = async ({
  baseUrl = '',
  endpoint = '',
  data = {},
  isProtected = false,
  jwtToken = '',
  additionalHeaders = {},
}) => {
  const result = {
    success: false,
    message: '',
    data: null,
  };

  let error = '';

  const urlComplete = baseUrl + endpoint;
  try {
    // Définir les en-têtes de la requête en ajoutant des en-têtes supplémentaires si disponibles
    const headers = {
      'Content-Type': 'application/json', // Par défaut, envoi des données en JSON
      ...(isProtected && { Authorization: 'Bearer ' + jwtToken }),
      ...additionalHeaders, // Fusionne les en-têtes supplémentaires
    };

    // Faire la requête PATCH avec les données et les en-têtes
    const response = await axios.patch(urlComplete, data, {
      headers: headers,
    });

    // Vérifier la réponse
    if (response.status === 200 || response.status === 204) {
      const rData = response.data;
      result.success = true;
      result.data = rData.data ?? rData;
    } else {
      error = response.data.message;
    }
  } catch (err : any | unknown) {
    error = err.message;
    if (err.response) {
      error = err.response.data.message;
    }
  }

  // Si une erreur est survenue, mettre à jour le message de résultat
  if (error !== '') {
    result.message = error;
  }

  return result;
};

const coreMakeDeleteRequest = async ({
  baseUrl = '',
  endpoint = '',
  isProtected = false,
  jwtToken = '',
  additionalHeaders = {},
}) => {
  const result = {
    success: false,
    message: '',
    data: null,
  };

  let error = '';

  const urlComplete = baseUrl + endpoint;
  try {
    // Définir les en-têtes de la requête en ajoutant des en-têtes supplémentaires si disponibles
    const headers = {
      ...(isProtected && { Authorization: 'Bearer ' + jwtToken }),
      ...additionalHeaders, // Fusionne les en-têtes supplémentaires
    };

    // Faire la requête DELETE avec les en-têtes
    const response = await axios.delete(urlComplete, {
      headers: headers,
    });

    // Vérifier la réponse
    if (response.status === 200 || response.status === 204) {
      result.success = true;
    } else {
      error = response.data.message;
    }
  } catch (err : any | unknown) {
    error = err.message;
    if (err.response) {
      error = err.response.data.message;
    }
  }

  // Si une erreur est survenue, mettre à jour le message de résultat
  if (error !== '') {
    result.message = error;
  }

  return result;
};


export {
  transformToDateTime,
  coreMakeGetRequest,
  coreMakePostRequest,
  coreMakePutRequest,
  coreMakePatchRequest,
  coreMakeDeleteRequest,
};
