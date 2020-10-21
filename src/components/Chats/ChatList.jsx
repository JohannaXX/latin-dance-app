import React from 'react';
import './ChatList.css';

const ChatList = () => {
    return (
        <div className="chatlist-container">

            <div className="row">
                <div className="col-sm-8 m-auto">
                    <div className="list list-row block">
                        <div className="list-item">
                            <div>
                                <a href="#" data-abc="true">
                                    <span className="w-48 avatar gd-warning">
                                        S
                                    </span>
                                </a>
                            </div>
                            <div className="flex"> 
                                <a href="#" className="item-author text-color" data-abc="true">
                                    Sam Kuran
                                </a>
                                <div className="item-except text-muted text-sm h-1x">
                                    Last message: <span>13/10/20</span>
                                </div>
                            </div>
                        </div>
                        <div className="list-item">
                            <div>
                                <a href="#" data-abc="true">
                                    <span className="w-48 avatar gd-primary">
                                        <img src="https://bootdey.com/img/Content/avatar/avatar1.png" alt="."/>
                                    </span>
                                </a>
                            </div>
                            <div className="flex"> 
                                <a href="#" className="item-author text-color" data-abc="true">
                                    Kinley Adulf
                                </a>
                                <div className="item-except text-muted text-sm h-1x">
                                    Last message: <span>10/10/20</span>
                                </div>
                            </div>
                        </div>
                        
                        <div className="list-item">
                            <div>
                                <a href="#" data-abc="true">
                                    <span className="w-48 avatar gd-info">
                                        F
                                    </span>
                                </a>
                            </div>
                            <div className="flex"> 
                                <a href="#" className="item-author text-color" data-abc="true">
                                    Karen Smith
                                </a>
                                <div className="item-except text-muted text-sm h-1x">
                                    Last message: <span>10/10/20</span>
                                </div>
                            </div>
                        </div>

                        <div className="list-item">
                            <div>
                                <a href="#" data-abc="true">
                                    <span className="w-48 avatar gd-info">
                                        <img src="https://img.icons8.com/color/48/000000/guest-male.png" alt="."/>
                                    </span>
                                </a>
                            </div>
                            <div className="flex"> 
                                <a href="#" className="item-author text-color" data-abc="true">
                                    Joe Cleveman
                                </a>
                                <div className="item-except text-muted text-sm h-1x">
                                    Last message: <span>08/10/20</span>
                                </div>
                            </div>
                        </div>
                        
                        
                    </div>
                </div>
            </div>  

        </div>
    );
}

export default ChatList;