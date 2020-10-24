import React from 'react'
import { useQuery, gql } from '@apollo/client';

const ALL_SPOTS = gql`
  {
  spots{
    _id
    name
    lat
    lng
    img{
      data
      contentType
    }
    containers{
      _id
      contType
      count
      probability
    }
  }
}
`;

const Spots = () => {
    const { loading, error, data } = useQuery(ALL_SPOTS);

    if (loading) return <p>Loading...</p>;
    if (error) {
        console.error(error);
        return <p>Whoops.. Something is wrong!</p>
    }

    return (
        <>
            <h2>Spots</h2>
            <table>
                <thead>
                    <tr>
                        <th colSpan='4'>Spot</th>
                        <th colSpan='2'>Image</th>
                        <th colSpan='3'>Containers</th>
                    </tr>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Latitude</th>
                        <th>Longitude</th>
                        <th>Data</th>
                        <th>Content type</th>
                        <th>Type</th>
                        <th>Count</th>
                        <th>Probability</th>
                    </tr>
                </thead>
                <tbody>
                    {data.spots.map(s => {
                        return (
                            <React.Fragment key={s._id}>
                                <tr>
                                    <td>{s._id}</td>
                                    <td>{s.name}</td>
                                    <td>{s.lat}</td>
                                    <td>{s.lng}</td>
                                    <td>{s.img.data}</td>
                                    <td>{s.img.contentType}</td>
                                    <td colSpan='3'></td>
                                </tr>
                                {s.containers.map(c => {
                                    return (
                                        <tr key={c._id}>
                                            <td colSpan='6'></td>
                                            <td>{c.contType}</td>
                                            <td>{c.count}</td>
                                            <td>{c.probability}</td>
                                        </tr>
                                    );
                                })}
                            </React.Fragment>
                        );
                    })}
                </tbody>
            </table>
        </>
    );
};

export default Spots;
