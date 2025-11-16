import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const courses = [
  {
    id: 1,
    title: "React for Beginners",
    description: "Learn the basics of React.",
    image: "/imgs/react.svg",
  },
  {
    id: 2,
    title: "Spring Boot Fundamentals",
    description: "Introduction to Spring Boot and REST APIs.",
    image: "/imgs/vite.svg",
  }
];

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

            <div style={{
                flex: 1,
                marginTop: "60px",  // push content below top bar
                marginBottom: "60px", // leave space for bottom bar
                overflowY: "auto",
                padding: "20px",
                display: "flex",
                flexWrap: "wrap",
                gap: "24px",
                justifyContent: "flex-start",
                width: "100%",
                marginLeft: "auto",
                marginRight: "auto",
            }}>
                {courses.map(course => (
                    <div
                        key={course.id}
                        style={{
                            flex: "0 1 calc(33.333% - 16px)",
                            height: "320px",
                            borderRadius: "8px",
                            boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                            overflow: "hidden",
                            position: "relative",
                            cursor: "pointer",
                        }}
                    >
                        {/* Background Image */}
                        <div style={{
                            position: "absolute",
                            inset: 0,
                            backgroundImage: `url(${course.image})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                        }} />

                        {/* Footer Overlay */}
                        <div style={{
                            position: "absolute",
                            bottom: 0,
                            width: "100%",
                            background: "rgba(255,255,255,0.7)",
                            backdropFilter: "blur(4px)",
                            padding: "16px",
                        }}>
                            <p style={{
                                fontWeight: "bold",
                                fontSize: "18px",
                                color: "#1f2937",
                                margin: 0,
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                            }}>{course.title}</p>

                            <p style={{
                                fontSize: "14px",
                                color: "#4b5563",
                                marginTop: "4px",
                                display: "-webkit-box",
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: "vertical",
                                overflow: "hidden",
                            }}>{course.description}</p>
                        </div>
                    </div>
                ))}
            </div>

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