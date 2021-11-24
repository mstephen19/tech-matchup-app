import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { createMatchup } from '../utils/api';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_TECH, MUTATION_MATCHUP } from '../utils/queriesMutations';

const Matchup = () => {
  const [techList, setTechList] = useState([]);
  const [formData, setFormData] = useState({
    tech1: 'JavaScript',
    tech2: 'JavaScript',
  });
  let history = useHistory();

  const { loading, data } = useQuery(QUERY_TECH);

  useEffect(() => {
    !loading && setTechList(data.tech);
  }, []);

  const [addMatchup, { error }] = useMutation(MUTATION_MATCHUP);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addMatchup({
        variables: {
          tech1: formData.tech1,
          tech2: formData.tech2,
        },
      });

      if (error) {
        throw new Error('something went wrong!');
      }

      const matchup = data.matchup;

      console.log(matchup);
      history.push(`/matchup/${matchup._id}`);
    } catch (err) {
      console.error(err);
    }

    setFormData({
      tech1: 'JavaScript',
      tech2: 'JavaScript',
    });
  };

  return (
    <div className='card bg-white card-rounded w-25'>
      <div className='card-header bg-dark text-center'>
        <h1>Let's create a matchup!</h1>
      </div>
      <div className='card-body m-5'>
        <form onSubmit={handleFormSubmit}>
          <label>Tech 1: </label>
          <select name='tech1' onChange={handleInputChange}>
            {loading ? (
              <option>Loading...</option>
            ) : (
              setTechList(data.tech) &&
              techList.map((tech) => {
                return (
                  <option key={tech._id} value={tech.name}>
                    {tech.name}
                  </option>
                );
              })
            )}
          </select>
          <label>Tech 2: </label>
          <select name='tech2' onChange={handleInputChange}>
            {techList.map((tech) => {
              return (
                <option key={tech._id} value={tech.name}>
                  {tech.name}
                </option>
              );
            })}
          </select>
          <button className='btn btn-danger' type='submit'>
            Create Matchup!
          </button>
        </form>
      </div>
    </div>
  );
};

export default Matchup;
