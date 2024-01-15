import React, { useRef } from 'react'
import Inputs from '../form/Inputs'
import { GrClose } from 'react-icons/gr'
import { GrEmptyCircle } from 'react-icons/gr'

const CreateKathaBox = ({ formRef, loading, submitForm, changeInputs, formInputs, setImg1Val, setImg2Val, openedCreateKatha, openKathaCreateBox, setPic1Path, setPic2Path, pic1Path, pic2Path }) => {

    const ref1 = useRef()
    const ref2 = useRef()

    const changePic1 = (e) => {
        console.log(e.target)
        if (e.target.files.length > 0) {
            const localPath = URL.createObjectURL(e.target.files[0])
            setImg1Val(e.target.value)
            setPic1Path(localPath)
        }
        else {
            return alert("Please select an image");
        }
    }
    const changePic2 = (e) => {
        console.log(e.target)
        if (e.target.files.length > 0) {
            const localPath = URL.createObjectURL(e.target.files[0])
            setImg2Val(e.target.value)
            setPic2Path(localPath)
        }
        else {
            return alert("Please select an image");
        }
    }



    return (
        <div className="katha-dailog" style={{ transform: `translateY(${openedCreateKatha ? "0px" : "-2000vh"})` }} >
            <div className="close-create-katha" onClick={openKathaCreateBox}><GrClose /></div>

            <div className="container">

                <div className="katha-container">
                    <form ref={formRef} onSubmit={submitForm}>
                        <h1>Create a new katha </h1>
                        <p>Please Complete this form to create new secure and trusted person katha </p>

                        <br /><br />
                        <h3>Upload </h3>
                        <p>upload the user image and scanned cnic front picture with the resolution of 300 dpi </p>

                        <div className="upload-area-container">

                            <div className="picture-area upload-block">
                                <img src={pic1Path.length < 0 ? "/author-1.png" : pic1Path} alt="upload" />
                                <div className="upload-input upload-input-pic">
                                    <input ref={ref1} type="file" onChange={changePic1} accept='image/*' />
                                    <h2 style={{ color: "white", textAlign: "center" }}>Upload Image</h2>
                                    <br />
                                    <button type='button' onClick={() => ref1.current.click()} className='uploadBtn'>Upload</button>
                                </div>
                            </div>

                            <div className="picture-area upload-block">
                                <img src={pic2Path.length < 0 ? "/author-1.png" : pic2Path} alt="upload" />
                                <div className="upload-input upload-input-pic">
                                    <input ref={ref2} type="file" onChange={changePic2} accept='image/*' />
                                    <h2 style={{ color: "white", textAlign: "center" }}>Upload Cnic</h2>
                                    <br />
                                    <button type='button' onClick={() => ref2.current.click()} className='uploadBtn'>Upload</button>
                                </div>
                            </div>




                        </div>


                        <div className="form-inputs-container">
                            <h3>Personal Information  </h3>
                            <p>Enter the customer valid personal information all. please don't leave an feild empty. </p>
                            <div className="parent-inputs">
                                <div className="fullname child-input">
                                    <Inputs name={'fullname'} type={'text'} ph={'Full Name'} required={true} minl={3} onchange={changeInputs} val={formInputs.name} />
                                </div>
                                <div className="country child-input">
                                    <Inputs type={'text'} name={'father'} required={true} ph={'Father name'} minl={'2'} onchange={changeInputs} val={formInputs.father} />
                                </div>
                                <div className="country child-input">
                                    <Inputs type={'text'} name={'cnic'} required={true} ph={'Enter Cnic'} minl={'10'} onchange={changeInputs} val={formInputs.cnic} />
                                </div>
                                <div className="country child-input">
                                    <Inputs type={'text'} name={'phone'} required={true} ph={'Phone Number'} minl={'2'} onchange={changeInputs} val={formInputs.phone} />
                                </div>
                                <div className="country child-input">
                                    <Inputs type={'text'} name={'area'} required={true} ph={'Area'} minl={'2'} onchange={changeInputs} val={formInputs.area} />
                                </div>
                            </div>
                            <div className="parent-inputs">
                                <textarea name="address" required cols="30" rows="7" placeholder='Enter full address ' onChange={changeInputs} value={formInputs.address} ></textarea>
                            </div>

                        </div>

                        <button className='form-createkatha-button resetBtn' type='reset' >Clear Form </button>
                        <button className='form-createkatha-button' type='submit' >{loading ? <GrEmptyCircle /> : "Create Now"}</button>


                    </form>
                </div>



            </div>




        </div>

    )
}

export default CreateKathaBox
