import React from 'react';
import './ChatList.css';

const ChatList = () => {
    return (
        <div className="chatlist-container">
        
            <div className="page-content page-container" id="page-content">
                <div className="padding">
                    <div className="row">
                        <div className="col-sm-6">
                            <div className="list list-row block">
                                <div className="list-item" data-id="19">
                                    <div><a href="#" data-abc="true"><span className="w-48 avatar gd-warning">S</span></a></div>
                                    <div className="flex"> <a href="#" className="item-author text-color" data-abc="true">Sam Kuran</a>
                                        <div className="item-except text-muted text-sm h-1x">For what reason would it be advisable for me to think about business content?</div>
                                    </div>
                                    <div className="no-wrap">
                                        <div className="item-date text-muted text-sm d-none d-md-block">13/12 18</div>
                                    </div>
                                </div>
                                <div className="list-item" data-id="7">
                                    <div><a href="#" data-abc="true"><span className="w-48 avatar gd-primary"><img src="https://img.icons8.com/color/48/000000/administrator-male.png" alt="."/></span></a></div>
                                    <div className="flex"> <a href="#" className="item-author text-color" data-abc="true">Kinley Adolf</a>
                                        <div className="item-except text-muted text-sm h-1x">For what reason would it be advisable for me to think about business content?</div>
                                    </div>
                                    <div className="no-wrap">
                                        <div className="item-date text-muted text-sm d-none d-md-block">21 July</div>
                                    </div>
                                </div>
                                <div className="list-item" data-id="17">
                                    <div><a href="#" data-abc="true"><span className="w-48 avatar gd-warning">H</span></a></div>
                                    <div className="flex"> <a href="#" className="item-author text-color" data-abc="true">Velden Kamut</a>
                                        <div className="item-except text-muted text-sm h-1x">For what reason would it be advisable for me to think about business content?</div>
                                    </div>
                                    <div className="no-wrap">
                                        <div className="item-date text-muted text-sm d-none d-md-block">13/3/19</div>
                                    </div>
                                </div>
                                <div className="list-item" data-id="16">
                                    <div><a href="#" data-abc="true"><span className="w-48 avatar gd-info">F</span></a></div>
                                    <div className="flex"> <a href="#" className="item-author text-color" data-abc="true">Stuart Kim</a>
                                        <div className="item-except text-muted text-sm h-1x">For what reason would it be advisable for me to think about business content?</div>
                                    </div>
                                    <div className="no-wrap">
                                        <div className="item-date text-muted text-sm d-none d-md-block">03/1/19</div>
                                    </div>
                                </div>
                                <div className="list-item" data-id="4">
                                    <div><a href="#" data-abc="true"><span className="w-48 avatar gd-success"><img src="https://img.icons8.com/color/48/000000/guest-male.png" alt="."/></span></a></div>
                                    <div className="flex"> <a href="#" className="item-author text-color" data-abc="true">Simply Fry</a>
                                        <div className="item-except text-muted text-sm h-1x">For what reason would it be advisable for me to think about business content?</div>
                                    </div>
                                    <div className="no-wrap">
                                        <div className="item-date text-muted text-sm d-none d-md-block">2 hours ago</div>
                                    </div>
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