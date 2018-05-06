import _ from 'lodash'
import moment from 'moment'

export default (profiles, user, swipedProfiles) => {
    const rejectMe = _.reject(profiles, profile => profile.uid === user.uid)
    //console.log('rejectMe', rejectMe)
    const filterGender = _.filter(rejectMe, profile => {
        const userShowMen = user.showMen && profile.gender === 'male'
        const userShowWomen = user.showWomen && profile.gender === 'female'

        const profileShowMen = profile.showMen && user.gender === 'male'
        const profileShowWomen = profile.showWomen && user.gender === 'female'

        return (userShowMen || userShowWomen) && (profileShowMen || profileShowWomen)
    })
    //console.log('filterGender', filterGender)
    const userBirthday = moment(user.birthday, "MM/DD/YYYY")
    //console.log('userBirthday', user.birthday)
    const userAge = moment().diff(userBirthday, 'years')
    //console.log('user', user)
    const filterAgeRange = _.filter(filterGender, profile => {
        const profileBirthday = moment(profile.birthday, 'MM/DD/YYYY')
        const profileAge = moment().diff(profileBirthday, 'years')

        const withinRangeUser = _.inRange(profileAge, user.ageRange[0], user.ageRange[1] + 1)
        const withinRangeProfile = _.inRange(userAge, profile.ageRange[0], profile.ageRange[1] + 1)

        return withinRangeUser && withinRangeProfile
    })
    //console.log('filterAgeRange', filterAgeRange)
    const filtered = _.uniqBy(filterGender, 'uid')
    //console.log('filtered', filtered)
    const filterSwiped = _.filter(filtered, profile => {
        const swiped = profile.uid in swipedProfiles
        return !swiped
    })
    //console.log('filterSwiped', filterSwiped)
    return filterSwiped
}