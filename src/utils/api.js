import axios from 'axios';

let tokenConfig = (token) => {
    return {
        headers: {
            'Authorization': token
        }
    }
}

const URL = "http://35.194.165.190:8080"

const api = {
    //auth
    login: (username, password) => {
        return axios.post(URL + "/login", { username, password })
    },
    register: (data) => {
        return axios.post(URL + "/register", data)
    },
    //user
    updateUser: (data, token) => {
        return axios.post(URL + "/user/update", data, tokenConfig(token))
    },
    uploadPhoto: (data, token) => {
        return axios.post(URL + "/user/uploadPhoto", data, tokenConfig(token))
    },
    loadPhoto: (username) => {
        return axios.get(URL + "/user/loadPhoto/" + username)
    },
    getInfo: (username) => {
        return axios.get(URL + "/user/info/" + username)
    },
    visitOtherUser: (userAccount) => {
        return axios.get(URL + "/user/visiting/" + userAccount)
    },
    updatePassword: (password, newPassword, token) => {
        return axios.post(URL + "/user/updatePassword", { password, newPassword }, tokenConfig(token))
    },
    //event
    deleteEvent: (eventId, token) => {
        return axios.post(URL + "/event/deleteEvent", { eventId }, tokenConfig(token))
    },
    createEvent: (eventSetting, token) => {
        return axios.post(URL + "/event/create", eventSetting, tokenConfig(token));
    },
    findMountainByArea: (area) => {
        return axios.get(URL + "/event/findByArea/" + area)
    },
    findMountainByCity: (city) => {
        return axios.get(URL + "/event/findByCity/" + city)
    },
    findMountainByAltitude: (path) => {
        return axios.get(URL + "/event/" + path)
    },
    findMountainByDifficulty: (dif) => {
        return axios.get(URL + "/event/findByDifficulty/" + dif)
    },
    findMountainByPopularity: () => {
        return axios.get(URL + "/event/findByPopularity")
    },
    findEventById(eventId) {
        return axios.get(URL + "/event/" + eventId)
    },
    searchEventByKeyword(keyword) {
        return axios.get(URL + "/event/keyword/" + keyword)
    },
    searchEventById(eventId) {
        return axios.get(URL + "/event/" + eventId)
    },
    closestEvents() {
        return axios.get(URL + "/event/closest")
    },
    editDescription(eventId, description, token) {
        return axios.post(URL + "/event/updateDescription", { eventId, description }, tokenConfig(token))
    },
    //eventMember
    getUpcomingEvents: (token) => {
        return axios.get(URL + "/eventMember/acceptedOnGoingEvents", tokenConfig(token))
    },
    getPastEvents: (token) => {
        return axios.get(URL + "/eventMember/acceptedHistoryEvents", tokenConfig(token))
    },
    getApplyingEvents: (token) => {
        return axios.get(URL + "/eventMember/appInProcess", tokenConfig(token))
    },
    deleteApplyingEvents: (eventId, token) => {
        return axios.post(URL + "/eventMember/deleteAppInProcess", { eventId }, tokenConfig(token))
    },
    quitEvent: (eventId, token) => {
        return axios.post(URL + "/eventMember/quitEvent", { eventId }, tokenConfig(token))
    },
    checkAppliedRequest: (eventId, token) => {
        return axios.get(URL + "/eventMember/appRequest/" + eventId, tokenConfig(token))
    },
    updateStatus: (status, emId, token) => {
        return axios.post(URL + "/eventMember/updateStatus", { status, emId }, tokenConfig(token))
    },
    tagMembers: (eventId, token) => {
        return axios.post(URL + "/eventMember/members", { eventId }, tokenConfig(token))
    },
    applyIn: (eventId, token) => {
        return axios.post(URL + "/eventMember/add/", { eventId }, tokenConfig(token))
    },
    //verification
    uploadVerificationPhoto: (data, token) => {
        return axios.post(URL + "/verification/uploadPhoto", data, tokenConfig(token))
    },
    apply: (data, token) => {
        return axios.post(URL + "/verification/apply", data, tokenConfig(token))
    },
    getRequests: (token) => {
        return axios.get(URL + "/verification/getRequests", tokenConfig(token))
    },
    verify: (verId, status, token) => {
        return axios.post(URL + "/verification/verify", { verId, status }, tokenConfig(token))
    },
    myEventsToVerify: (token) => {
        return axios.get(URL + "/verification/myEventsToVerify", tokenConfig(token))
    },
    //Achievement
    achievement: (username) => {
        return axios.get(URL + "/achievement/" + username)
    },
    getAchievementsInfo: (username) => {
        return axios.get(URL + "/achievement/eventAndPhoto/" + username)
    },
    topClimbersByAltitude: () => {
        return axios.get(URL + "/achievement/mostPopularByAltitude")
    },
    topClimbersByRecords: () => {
        return axios.get(URL + "/achievement/mostPopularByRecords")
    },
    //photo
    getAllPhoto: (username) => {
        return axios.get(URL + "/photo/getAll/" + username)
    },

    uploadAlbumPhoto: (data, token) => {
        return axios.post(URL + "/photo/upload", data, tokenConfig(token))
    },
    getPhotoByAlbum: (folderName, username) => {
        return axios.get(URL + "/photo/getFolderPhotos/" + username + "/" + folderName)
    },
    //photo folder
    getAllFolders: (username) => {
        return axios.get(URL + "/photoFolder/allFolders/" + username)
    },
    createFolders: (folderName, token) => {
        return axios.post(URL + "/photoFolder/create", { folderName }, tokenConfig(token))
    },
    //friends
    getFriends: (username) => {
        return axios.get(URL + "/relationship/friends/" + username)
    },
    add: (userName, token) => {
        return axios.post(URL + "/relationship/add", { userName }, tokenConfig(token))
    },
    getInvitations: (token) => {
        return axios.get(URL + "/relationship/getInvitations", tokenConfig(token))
    },
    cancelInvitations: (userName, token) => {
        return axios.post(URL + "/relationship/cancelInvitation", { userName }, tokenConfig(token))
    },
    update: (relationshipId, status, token) => {
        return axios.post(URL + "/relationship/update", { relationshipId, status }, tokenConfig(token))
    },
    sentInvitation: (token) => {
        return axios.get(URL + "/relationship/sentInvitation", tokenConfig(token))
    },

    //Mountain
    findMountainByIds: (mountainIds) => {
        return axios.post(URL + "/mountain/", mountainIds)
    },
    loadMountainPhoto: (mountainId) => {
        return axios.get(URL + "/mountain/loadPhoto/" + mountainId)
    },
    findMostReachedMountains: () => {
        return axios.get(URL + "/mountain/findMostReached")
    },
    //Message
    findMsgByEventId: (eventId) => {
        return axios.get(URL + "/message/getByEvent/" + eventId)
    },
    addMsg: (eventId, msg, token) => {
        return axios.post(URL + "/message/add", { eventId, msg }, tokenConfig(token))
    },
    deleteMsg: (messageId, token) => {
        return axios.post(URL + "/message/delete", { messageId }, tokenConfig(token))
    }
}
export default api;
