import React, { useState } from 'react';
import { images } from '../../constants';
import Results from './Results';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { AiFillRightCircle, AiFillLike } from 'react-icons/ai';
import CircularProgress from '@material-ui/core/CircularProgress';
import './Header.css';
const API_URL = 'https://api.mapmycrop.store/ai/detect-disease?api_key=88ce5746a5904ba6947ed9a8bf22d6a9';

function Header() {

    const {
        formState: { errors },
    } = useForm();

    const [file, setFile] = useState();
    const [conformBtnDisabled, setConformBtnDisabled] = useState(true);
    const [addBtnDisable, setAddBtnDisable] = useState(true);
    const [preview, setPreview] = useState(null);
    const [data, setData] = useState(null);
    const [isLoading, setLoading] = useState(false);

    const onAddImage = (file) => {
        window.URL.revokeObjectURL(preview);
        if (!file) return;
        setPreview(window.URL.createObjectURL(file));
        setFile(file);
        imageSelected();
    };

    const imageSelected = () => {
        setConformBtnDisabled(false);
        setData(null);
    }

    const userConfirm = () => {
        setAddBtnDisable(false);
        setData(null);
    }

    const onSubmit = async () => {
        const formData = new FormData();
        formData.append('image', file);
        console.log('Uploaded file -', file);
        setLoading(true);

        try {
            const result = await axios
                .post(API_URL, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    }
                }
                ).then((res) => {
                    console.log(res.data);
                    setData(res.data);
                    setAddBtnDisable(true);
                    setConformBtnDisabled(true);
                    setLoading(false);
                })
        } catch (e) {
            console.log(e);
        }
    }

    // fetch(API_URL, {
    //     method: 'POST',
    //     mode: 'cors',
    //     body: formData,
    //     headers: {
    //         'Content-Type': 'multipart/form-data'
    //     }
    // }).then(function (response) {
    //     console.log(response.status);
    //     console.log('response');
    //     console.log(response);
    // }).catch(function(error) {
    //     console.log(error);
    // })

    console.log('Output Data is', data)

    return (
        <>
            <div className='app__header app__bg app__wrapper section__padding' id='home'>
                <div className='app__wrapper_info'>
                    <h1 className='app__header-h1'>Let's work together to make the most out of this harvest</h1>
                    <p className='p__opensans' style={{ margin: "1rem 0" }}>
                        Please upload a photo of your plant leaf below
                    </p>

                    <div className='app__cropImage'>
                        <div className="app__cropImage-content">
                            <form id='imageForm' encType='multipart/form-data' onSubmit={onSubmit}>
                                <div className='app__cropImage-content_input'>
                                    <input
                                        filename={file}
                                        onChange={(e) => onAddImage(e.target.files[0])}
                                        type="file"
                                        accept="image/jpg, image/jpeg, image/png"
                                        id="upload_img"
                                        name='image'
                                        required
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
                                                Please confirm
                                            </Button>

                                            <Button
                                                type='button'
                                                id="Submit"
                                                variant="contained"
                                                color="primary"
                                                disabled={addBtnDisable}
                                                onClick={onSubmit}>
                                                Start Health Check
                                            </Button>

                                        </div>
                                    </div>
                                </div>
                            </form>

                            <div style={{
                                'display': 'flex',
                                'justifyContent': 'center',
                                'alignItems': 'center'
                            }}>
                                {isLoading === true ?
                                    <div>
                                        <CircularProgress
                                            style={{ color: '#FFF', 'margin': '1rem 0' }} /></div>
                                    : null
                                }
                                {data ?
                                    <p className='p__opensans app__cropImage-scroll'>
                                        <AiFillRightCircle className='app__cropImage-icons' />
                                        Please Scroll down to see Health check results
                                        <AiFillLike className='app__cropImage-icons' />
                                    </p> : null
                                }
                            </div>

                        </div>
                    </div>

                </div>

                <div className="app__wrapper_img">
                    <img src={images.slider_bg} alt="header img" />
                </div>

            </div>

            {data ?
                <div>
                    <Results CropAnalysis={data} />
                </div> : null
            }

        </>
    )
}

export default Header