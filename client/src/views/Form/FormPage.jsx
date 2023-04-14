import {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Link, useHistory} from "react-router-dom";
import { getDiets, postRecipes } from "../../redux/actions";
import Validate from "./Validate";
import style from '../Form/FormPage.module.css'

const FormPage = () => {

  const history = useHistory();
  const dispatch = useDispatch();
  const allDiets = useSelector(state => state.diets);
  
  const [form, setForm] = useState({
    name: '',
    summary: '',
    healthScore: '',
    steps: [],
    time: '',
    image: '',
    diets: []
  });

  const [errors, setErrors] = useState({});
  const [step, setStep] = useState("");

  useEffect(() => {
    dispatch(getDiets())
  }, [dispatch]);


  const handleChange = (event) => {
    const property = event.target.name;
    const value = event.target.value;
    setForm({
      ...form,
      [property] : value
    });
    console.log(form)
    setErrors(
      Validate({
        ...form,
        [property] : value
      })
    )
  };

  const handlerSelect = (e) => {
    setForm({
      ...form,
      diets: [...form.diets, e.target.value]
    })
  }

  const handleDelete = (el) => {
    setForm({
      ...form,
      diets: form.diets.filter(diet => diet !== el)
    })
  }

  const handleStepChange = (event) => {
    setStep(event.target.value);
  };

  const handleAddStep = () => {
    if (step) {
      setForm({
        ...form,
        steps: [...form.steps, step]
      });
      setStep("");
    }
  };

  const handleDeleteStep = (index) => {
    const newSteps = [...form.steps];
    newSteps.splice(index, 1);
    setForm({
      ...form,
      steps: newSteps
    });
  };

  const handleSubmit =  (e) => {
    e.preventDefault();
    dispatch(postRecipes(form));
    
      setForm({
        name: '',
        summary: '',
        healthScore: '',
        steps: [],
        time: '',
        image: '',
        diets: []
      })
       history.push('/home')
  };

  return(
    <div className={style.container}>

    <section className={style.sections}>

        <Link to='/home'>
          <button className={style.btn_back}>Return</button>
        </Link>
        
      <form onSubmit={handleSubmit} className={style.forms}>
      <h1 className={style.h1_form}>Create Your Recipe!</h1>
        
        <br />
        <div>
          <label htmlFor="name" className={style.labels}>Name </label>
          <input type="text" value={form.name} onChange={handleChange} name="name" autoComplete="off" className={style.inputs} />
          {errors.name && <p className={style.error_p}>{errors.name}</p>}
        </div>
        <br />
        <div>
          <label htmlFor="healthScore" className={style.labels}>Health Score </label>
          <input type="text" value={form.healthScore} onChange={handleChange} name="healthScore" autoComplete="off" className={style.inputs} />
          {errors.healthScore && <p className={style.error_p}>{errors.healthScore}</p>}
        </div>
        <br />
        <div>
          <label htmlFor="summary" className={style.labels}>Summary </label>
          <textarea type="text" value={form.summary} onChange={handleChange} name="summary" autoComplete="off" className={style.inputs} />
          {errors.summary && <p className={style.error_p}>{errors.summary}</p>}
        </div>
        <br />
        <div className={style.steps_1}> 
          <label htmlFor="steps" className={style.labels}>Steps </label>
          <textarea disabled type="text" value={form.steps} onChange={handleChange} name="steps" autoComplete="off" className={style.textsareas} />
        </div>
        <div className={style.step_1}>
          <label htmlFor="step" className={style.labels_step}>Step </label>
          <input type="text" value={step} onChange={handleStepChange} name="step" autoComplete="off" className={style.inputs_step} />
          <button type="button" onClick={handleAddStep}  className={style.step_btn}>Add</button>
        </div>
        <div className={style.steps_1}>
        <label htmlFor="steps" className={style.labels}>Steps </label>
        {form.steps.map((step, index) => (
          <div key={index}>
            {step} 
            <button onClick={() => handleDeleteStep(index)} className={style.steps_btn}>X</button>
          </div>
        ))}
          {errors.steps && <p className={style.error_p}>{errors.steps}</p>}
        </div>
        <br />
        <div>
          <label htmlFor="image" className={style.labels}>Image </label>
          <input type="text" value={form.image} onChange={handleChange} name="image" autoComplete="off" className={style.inputs} />
          {errors.image && <p className={style.error_p}>{errors.image}</p>}
        </div>
        <br />
        <div className={style.diets_1}>
          <label htmlFor="" className={style.diets_label}> Type of Diets: </label>
          <select onChange={handlerSelect} className={style.selects}>
            {allDiets.map((diet, index) => (
              <option value={diet.name} key={index}> {diet.name} </option>
            ))}
          </select>
          
          {errors.diets && (<p className={style.error_p}>{errors.diets}</p>)}  
          {form.diets.map((el) => {
            return (
              <div key={el}>
              <button onClick={()=>handleDelete(el)} className={style.diets_btn}>X</button>
              <span> {el} </span>
              </div>
            )
          })}

                   
        </div>   
        <br />
        <button type="submit" className={style.btn_8}>Created</button>  
      </form>
    </section>
    </div>
  )
}

export default FormPage;