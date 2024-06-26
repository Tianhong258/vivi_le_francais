"use client"
import React from 'react'
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button'
import Link from 'next/link';
import NavBar from '../../components/NavBar';
import { getDetail } from "../getDatail"
import withAuth from '../../components/withAuth'

//todo : pagination

const detail = ({ params }) => {
  const [data, setData] = useState({})
  const [viewMessageSuppression, setViewMessageSuppression] = useState('');

  useEffect(() => {
    async function getDetailVocabulaire() {
      const getData = await getDetail(params.detailId)
      setData(getData)
    }
    getDetailVocabulaire()
  }, []);


  async function deleteVocabulaire(id) {
    try {
      const response = await fetch(`http://localhost:3001/api/${id}`, { method: "DELETE", credentials: "include" });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Une erreur est survenue');
      }

      setViewMessageSuppression('Votre mot a bien été supprimé.');
    } catch (error) {
      console.error('Erreur lors de la suppression du mot :', error);
      setViewMessageSuppression("Oups, il y a eu un problème lors de la suppression du mot.");
    }
  }


  return (
    <>
      <div>
        <NavBar />
      </div>
      {viewMessageSuppression ? (
        <div>
          <p>{viewMessageSuppression}</p>
        </div>
      ) : (
        <div>
          <h1>{data.fr}</h1>
          <h2>{`Définition : ${data.ch}`}</h2>
          <h2>{`Jeux : ${data.jeux}`}</h2>
          <Link href={`/mon-cahier/${params.detailId}/modification`}><Button style={{ backgroundColor: 'rgb(52, 84, 180)' }}>Modifier</Button></Link>
          <Button variant="outline" onClick={() => deleteVocabulaire(params.detailId)}>Supprimer</Button>
        </div>
      )}
    </>
  )
}

export default withAuth(detail)