import React, { useState, useEffect } from "react";
import api from "../api";
import PetCard from "../components/PetCard";
import Banner from "../components/Banner";

const Pets = () => {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const res = await api.get("/pets");
        setPets(res.data);
      } catch (err) {
        console.error("Error fetching pets:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPets();
  }, []);

  // Banner
  return (
    <section style={{ padding: '60px 20px', backgroundColor: '#f7f8fa' }}>
      <Banner image="/images/banner-pets.jpg" title="Available Pets for Adoption" />
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '40px', color: '#222', fontFamily: 'Kanit, sans-serif' }}>Available Pets</h2>

        {loading ? (
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '2rem' }}>
            {[...Array(8)].map((_, i) => (
              <div key={i} className="pet-card-clean" style={{ background: '#f9f9f9' }}>
                <div className="pet-img-box" style={{ background: '#e0e0e0' }}></div>
                <div className="pet-info" style={{ padding: '1.2rem 1.4rem' }}>
                  <div style={{ height: '20px', background: '#e0e0e0', marginBottom: '0.5rem' }}></div>
                  <div style={{ height: '24px', background: '#e0e0e0', marginBottom: '0.5rem' }}></div>
                  <div style={{ height: '40px', background: '#e0e0e0', marginBottom: '1rem' }}></div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ height: '16px', width: '100px', background: '#e0e0e0' }}></div>
                    <div style={{ height: '32px', width: '80px', background: '#e0e0e0', borderRadius: '8px' }}></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : pets.length === 0 ? (
          <p style={{ textAlign: 'center' }}>No pets available right now.</p>
        ) : (
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'stretch', gap: '2rem', maxWidth: '1400px', margin: '0 auto' }}>
            {pets.map((pet) => (
              <PetCard key={pet.id} pet={pet} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Pets;

