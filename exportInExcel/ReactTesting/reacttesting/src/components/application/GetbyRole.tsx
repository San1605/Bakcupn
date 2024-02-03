import React from 'react'

const GetbyRole = () => {
  return (
    <div>
      <p>hello </p>
      <form>
        <div>
          <label>Name</label>
          <input type="text" id='name' placeholder='please enter name here' value="input"/>
        </div>
        <div>
          <label htmlFor="">job location</label>
          <select name="" id="">
            <option value="">select a country</option>
            <option>United states</option>
            <option>United Kingdom</option>
          </select>
        </div>

        <div>
          <label>
            <input type='checkbox' />
            i agree to hte terms and condition
          </label>
        </div>
        <button>submit</button>

      </form>
    </div>
  )
}

export default GetbyRole
