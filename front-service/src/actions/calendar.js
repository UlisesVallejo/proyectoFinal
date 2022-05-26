import Swal from 'sweetalert2';
import { fetchWithToken } from '../helpers/fetch';
import { prepareEvents } from '../helpers/prepare-events';
import { types } from '../types/types';

// Asincrono, guardar en la base de datos
export const eventStartAddNew = (event) => {

    return async (dispatch, getState) => {

        const { uid, name } = getState().auth;

        try {
            
            const resp = await fetchWithToken('events', event, 'POST', 'events');
            const body = await resp.json();


            if (body.ok){
                event._id = body.event._id
                event.user = uid;
                dispatch(eventAddNew(event));
            }


        } catch (error) {
            console.log(error)
        }

    }

}

// sincrono, actualizar el store
const eventAddNew = (event) => ({
    type: types.eventAddNew,
    payload: event
});



export const eventStartUpdate = (event) => {
    return async (dispatch) => {

        try {
            // events/eventId
            const resp = await fetchWithToken(`events/${ event._id }`, event, 'PUT', 'events');
            const body = await resp.json();

            if (body.ok){
                // no puede ser el evento que retorna el body porque hay que parsear las fechas con el helper
                dispatch(eventUpdated(event));
            }
            else {
                Swal.fire('Error', body.errors.id.msg, 'error');
            }

        } catch (error) {
            console.log(error);
        }

    }
}

const eventUpdated = (event) => ({
    type: types.eventUpdated,
    payload: event
});
 


export const eventStartLoading = () => {

    return async (dispatch) => {

        try {
            
            const resp = await fetchWithToken('events', {}, 'GET', 'events');
            const body = await resp.json();
            
            if (body.ok){
                console.log('body', body)
                const events = prepareEvents(body.events);
                dispatch(eventLoaded(events));
            }

        } catch (error) {
            console.log(error);
        }

    }

}

const eventLoaded = (events) => ({
    type: types.eventLoaded,
    payload: events
});



export const eventSetActive = (event) => ({
    type: types.eventSetActive,
    payload: event
});


// Asincrono
export const eventStartDelete = () => {

    return async (dispatch, getState) => {

        const { _id } = getState().calendar.activeEvent;

        try {
            
   
            Swal.fire({
                title: 'Estas seguro?',
                text: 'Esto no será revertible!',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si, eliminar!'
                }).then( async (result) => { 
                if (result.isConfirmed) {
                    const resp = await fetchWithToken(`events/${ _id }`, {}, 'DELETE', 'events');
                    const body = await resp.json();


                    if (body.ok){
                        dispatch(eventDeleted());
                        Swal.fire(
                            'Eliminado!',
                            'El evento ha sido eliminado correctamente.',
                            'success'
                        )
                    } 
                    
                    else {
                        Swal.fire('Error', 'No tiene autorización para eliminar el evento', 'error');
                    }
                }
                });
                
            

        } catch (error) {
            console.log(error);
        }
               
    }

}

// sincrono
const eventDeleted = () => ({ type: types.eventDeleted });

export const eventCleared = () => ({ type: types.eventClear });
