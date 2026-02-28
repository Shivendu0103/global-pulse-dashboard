import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function ProfileView() {
    const [profileData, setProfileData] = useState({
        name: 'Eco Warrior 101',
        location: 'San Francisco, CA',
        organization: 'Green Earth Initiative',
        alerts: true,
        publicProfile: false
    });

    const handleSave = (e) => {
        e.preventDefault();
        alert('Profile Saved! (Mock Action)');
    };

    return (
        <div className="content-wrapper" style={{ paddingTop: '6rem', minHeight: '100vh', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div className="narrative-header" style={{ textAlign: 'left', margin: 0 }}>
                <h2 className="dashboard-heading" style={{ margin: 0, fontSize: '2.5rem' }}>User <span className="text-gradient">Profile</span></h2>
                <p className="text-muted" style={{ maxWidth: '600px', marginTop: '0.5rem' }}>Manage your personal details, tracking preferences, and privacy settings.</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 1fr) 2fr', gap: '2rem' }}>

                {/* Left Column: Stats & Avatar */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="glass-panel" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                        <div style={{ width: '100px', height: '100px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--color-brand) 0%, rgba(16, 34, 34, 1) 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem', border: '2px solid rgba(255,255,255,0.1)' }}>
                            <span className="material-symbols-outlined" style={{ fontSize: '3rem', color: 'rgba(255,255,255,0.8)' }}>person</span>
                        </div>
                        <h3 className="m-0 text-xl font-bold">{profileData.name}</h3>
                        <p className="text-brand text-sm mt-1">{profileData.organization || 'Independent Contributor'}</p>

                        <div style={{ width: '100%', borderTop: '1px solid rgba(255,255,255,0.1)', margin: '1.5rem 0' }}></div>

                        <div className="flex-between w-full">
                            <div className="text-center">
                                <div className="text-2xl font-bold text-white">850</div>
                                <div className="text-xs text-muted">Impact Score</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold text-accent">Top 5%</div>
                                <div className="text-xs text-muted">Global Rank</div>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Right Column: Settings Form */}
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="glass-panel" style={{ padding: '2rem' }}>
                    <h3 className="card-title mb-6">Account Settings</h3>

                    <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <label className="text-sm text-muted font-medium">Display Name</label>
                            <input
                                type="text"
                                value={profileData.name}
                                onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                                style={{ background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', padding: '0.75rem', borderRadius: '0.5rem', color: 'white', width: '100%' }}
                            />
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                <label className="text-sm text-muted font-medium">Location</label>
                                <input
                                    type="text"
                                    value={profileData.location}
                                    onChange={(e) => setProfileData({ ...profileData, location: e.target.value })}
                                    style={{ background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', padding: '0.75rem', borderRadius: '0.5rem', color: 'white', width: '100%' }}
                                />
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                <label className="text-sm text-muted font-medium">Organization</label>
                                <input
                                    type="text"
                                    value={profileData.organization}
                                    onChange={(e) => setProfileData({ ...profileData, organization: e.target.value })}
                                    style={{ background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', padding: '0.75rem', borderRadius: '0.5rem', color: 'white', width: '100%' }}
                                />
                            </div>
                        </div>

                        <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', margin: '0.5rem 0' }}></div>

                        <h4 className="text-white font-medium m-0">Preferences</h4>

                        <div className="flex-between" style={{ background: 'rgba(0,0,0,0.2)', padding: '1rem', borderRadius: '0.5rem', border: '1px solid rgba(255,255,255,0.05)' }}>
                            <div>
                                <div className="text-white font-medium">Receive Impact Alerts</div>
                                <div className="text-xs text-muted mt-1">Get notified when global emissions spike in your tracked regions.</div>
                            </div>
                            <label style={{ position: 'relative', display: 'inline-block', width: '48px', height: '28px' }}>
                                <input
                                    type="checkbox"
                                    checked={profileData.alerts}
                                    onChange={(e) => setProfileData({ ...profileData, alerts: e.target.checked })}
                                    style={{ opacity: 0, width: 0, height: 0 }}
                                />
                                <span style={{ position: 'absolute', cursor: 'pointer', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: profileData.alerts ? 'var(--color-brand)' : 'rgba(255,255,255,0.2)', transition: '.4s', borderRadius: '34px' }}>
                                    <span style={{ position: 'absolute', content: '""', height: '20px', width: '20px', left: '4px', bottom: '4px', backgroundColor: profileData.alerts ? '#000' : 'white', transition: '.4s', borderRadius: '50%', transform: profileData.alerts ? 'translateX(20px)' : 'translateX(0)' }}></span>
                                </span>
                            </label>
                        </div>

                        <div className="flex-between" style={{ background: 'rgba(0,0,0,0.2)', padding: '1rem', borderRadius: '0.5rem', border: '1px solid rgba(255,255,255,0.05)' }}>
                            <div>
                                <div className="text-white font-medium">Public Profile</div>
                                <div className="text-xs text-muted mt-1">Allow other users in your organization to see your impact score.</div>
                            </div>
                            <label style={{ position: 'relative', display: 'inline-block', width: '48px', height: '28px' }}>
                                <input
                                    type="checkbox"
                                    checked={profileData.publicProfile}
                                    onChange={(e) => setProfileData({ ...profileData, publicProfile: e.target.checked })}
                                    style={{ opacity: 0, width: 0, height: 0 }}
                                />
                                <span style={{ position: 'absolute', cursor: 'pointer', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: profileData.publicProfile ? 'var(--color-brand)' : 'rgba(255,255,255,0.2)', transition: '.4s', borderRadius: '34px' }}>
                                    <span style={{ position: 'absolute', content: '""', height: '20px', width: '20px', left: '4px', bottom: '4px', backgroundColor: profileData.publicProfile ? '#000' : 'white', transition: '.4s', borderRadius: '50%', transform: profileData.publicProfile ? 'translateX(20px)' : 'translateX(0)' }}></span>
                                </span>
                            </label>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem' }}>
                            <button type="submit" className="hero-button primary-glow" style={{ padding: '0.75rem 2rem', fontSize: '1rem' }}>
                                Save Changes
                            </button>
                        </div>
                    </form>
                </motion.div>

            </div>
        </div>
    );
}
