<label>
        Image:
        <input type="file" name="image" onChange={handleImageChange} />
      </label>

const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const imageUrl = await uploadImage(file);
  
        // Update the form state with the Cloudinary image URL
        setFormData((prevData) => ({
          ...prevData,
          image: imageUrl,
        }));
      } catch (error) {
        console.error('Error uploading image to Cloudinary:', error);
      }
    }
  };

const uploadImage = async (file) => {
    if (!file) {
      throw new Error('No file provided');
    }
  
    try {
      const cloudinaryUrl = 'https://api.cloudinary.com/v1_1/dnwujnjie/image/upload';
      const uploadPreset = 'l9gnom66';
  
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', uploadPreset);
  
      const response = await Axios.post(cloudinaryUrl, formData);
  
      if (response.status === 200) {
        return response.data.secure_url;
      } else {
        console.error('Cloudinary Response:', response);
        throw new Error('Failed to upload image to Cloudinary');
      }
    } catch (error) {
      console.error('Error uploading image to Cloudinary:', error);
      throw error;
    }
  };