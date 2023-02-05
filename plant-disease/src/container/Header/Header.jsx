import React, { useEffect, useState } from 'react';
import { images } from '../../constants';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import './Header.css';
const API_URL = 'https://api.mapmycrop.store/ai/detect-disease?api_key=88ce5746a5904ba6947ed9a8bf22d6a9';

function Header() {

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const [file, setFile] = useState();
    const [conformBtnDisabled, setConformBtnDisabled] = useState(true);
    const [addBtnDisable, setAddBtnDisable] = useState(true);
    const [preview, setPreview] = useState(null);
    const [data, setData] = useState();

    const onAddImage = (file) => {
        window.URL.revokeObjectURL(preview);
        if (!file) return;
        setPreview(window.URL.createObjectURL(file));
        setFile(file);
        imageSelected();
    };

    const imageSelected = () => {
        setConformBtnDisabled(false);
    }

    const userConfirm = () => {
        setAddBtnDisable(false);
    }

    const onSubmit = async () => {
        const formData = new FormData();
        formData.append('file', file);
        console.log('Uploaded file -', file);

        axios
            .post(API_URL, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            }).then((res) => {
                console.log(res.data);
                setData(res.data);
            })

    }

    return (
        <div className='app__header app__bg app__wrapper section__padding' id='home'>
            <div className='app__wrapper_info'>
                <h1 className='app__header-h1'>Let's work together to make the most out of this harvest</h1>
                <p className='p__opensans' style={{ margin: "1rem 0" }}>
                    Please upload a photo of your plant leaf below
                </p>

                <div className='app__cropImage'>
                    <div className="app__cropImage-content">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className='app__cropImage-content_input'>
                                <input
                                    {...register('file', { required: true })}
                                    filename={file}
                                    onChange={(e) => onAddImage(e.target.files[0])}
                                    type="file"
                                    accept="image/jpeg, image/png, image/jpg"
                                    id="upload_img"
                                    name='file'
                                ></input>

                                {errors.file?.type === 'required' && (
                                    <p className='alert alert-danger' id='file-error'>
                                        File is required
                                    </p>
                                )}

                                <div className='app__cropImage-content_image'>
                                    <img src={preview || images.defaultImg} alt="Thumbnail" />

                                    <div className='app__cropImage-content_actions'>
                                        <Button
                                            id='confirm'
                                            variant="contained"
                                            color="primary"
                                            disabled={conformBtnDisabled}
                                            style={{ marginRight: '1rem' }}
                                            onClick={userConfirm}>
                                            Confirmation
                                        </Button>

                                        <Button
                                            type='button'
                                            id="Submit"
                                            variant="contained"
                                            color="primary"
                                            disabled={addBtnDisable}
                                            onClick={onSubmit}>
                                            Health Check
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </form>

                    </div>
                </div>

            </div>

            <div className="app__wrapper_img">
                <img src={images.slider_bg} alt="header img" />
            </div>

        </div>
    )
}

export default Header