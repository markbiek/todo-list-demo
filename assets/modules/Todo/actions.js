import axios from 'axios';

const $ = jQuery;

export const SET_SELECTED_LIST = 'SET_SELECTED_LIST';

export const actionSetSelectedList = name => ({
    type: SET_SELECTED_LIST,
    name
});
