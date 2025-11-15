import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Home = ({ }) => {

    return (
        <div style={{ // top level column
            display: "flex",
            flexDirection: "column",
            height: "100vh",
        }}>
            <div style={{ // top bar background
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                backgroundColor: "#1e1e1e",
                borderBottom: "2px solid #333",
                color: "white",
                zIndex: 1000,
            }}>
                <div style={{ // top bar content
                        maxWidth: "1200px",
                        margin: "0 auto",  
                        padding: "10px 20px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                }}>
                    <div>
                        <p>dropdown</p>
                    </div>
                    <div>
                        <p>symbol</p>
                    </div>
                    <div>
                        <Link to="/login">
                        <p>user/login</p>
                        </Link>
                    </div>
                </div>
            </div>

            <div style={{ height: "60px" }} /* spacer to prevent content from being hidden under fixed top bar*/ /> 

            <div style={{ // course content scroll area
                    flex: 1,
                    overflowY: "auto",
                    maxWidth: "1200px",
                    margin: "0 auto",
                    padding: "20px",
            }}>
                <p>courses scroll area</p>
            </div>

            <div style={{ height: "60px" }} /* spacer to prevent content from being hidden under fixed bottom bar*/ /> 

            <div style={{ // footer background for endless mode
                position: "fixed",
                bottom: 0,
                left: 0,
                width: "100%",
                backgroundColor: "#1e1e1e",
                borderBottom: "2px solid #333",
                color: "white",
                zIndex: 1000,
            }}>
                <p>endless mode</p>
            </div>
        </div>
    );
};

export default Home;