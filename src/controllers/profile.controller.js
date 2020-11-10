const { profile } = require('console');
const Profile = require('./../models/profile')


exports.saveProfileDetails = async (req, res) => {
  const { username, age, gender } = req.body
  try {
    const profilePictureBuffer = req.file.buffer
    let TYPED_ARRAY = new Uint8Array(profilePictureBuffer);
    const profilePicture = String.fromCharCode.apply(null, TYPED_ARRAY);

    const profile = new Profile({
      username,
      age,
      gender,
      profilePicture
    })
    await profile.save()
    res.status(200).send({ message: 'Profile saved...', profile })
    // res.status(400).send({ message: 'Unable to save profile details' })
  } catch (error) {
    res.status(400).send({ message: 'Unable to save profile details' })
  }
}

exports.fetchProfileDetails = async (req, res) => {

  try {
    const profiles = await Profile.find({})
    res.status(200).send({ profiles })
  } catch (error) {
    res.status(400).send({ message: 'Unable to fetch profiles' })
  }
}
