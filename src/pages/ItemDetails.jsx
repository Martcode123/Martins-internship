// https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails?nftId=17914494
import React, { useEffect, useState } from "react";
import EthImage from "../images/ethereum.svg";
import { Link, useParams } from "react-router-dom";
import AuthorImage from "../images/author_thumbnail.jpg";
import nftImage from "../images/nftImage.jpg";
import axios from "axios";
import Skeleton from "../components/UI/Skeleton";

const ItemDetails = () => {
  const [items, setItems] = useState();
  const { nftId } = useParams();

  async function itemDetailsData() {
    const { data } = await axios.get(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails?nftId=${nftId}`
    );
    console.log(data);
    setItems(data);
  }

  useEffect(() => {
    itemDetailsData();
    window.scrollTo(0, 0);
  }, []);

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <section aria-label="section" className="mt90 sm-mt-0">
          <div className="container">
            {items ? (
              <div className="row">
                <div className="col-md-6 text-center">
                  <img
                    src={items.nftImage}
                    className="img-fluid img-rounded mb-sm-30 nft-image"
                    alt=""
                  />
                </div>
                <div className="col-md-6">
                  <div className="item_info">
                    <h2>{items.creatorName} #{items.tag}</h2>

                    <div className="item_info_counts">
                      <div className="item_info_views">
                        <i className="fa fa-eye"></i>
                        {items.views}
                      </div>
                      <div className="item_info_like">
                        <i className="fa fa-heart"></i>
                        {items.likes}
                      </div>
                    </div>
                    <p>
                      {items.description}
                    </p>
                    <div className="d-flex flex-row">
                      <div className="mr40">
                        <h6>Owner</h6>
                        <div className="item_author">
                          <div className="author_list_pp">
                            <Link to={`/author/${items.ownerId}`}>
                              <img className="lazy" src={items.ownerImage} alt="" />
                              <i className="fa fa-check"></i>
                            </Link>
                          </div>
                          <div className="author_list_info">
                            <Link to={`/author/${items.ownerId}`}>{items.ownerName}</Link>
                          </div>
                        </div>
                      </div>
                      <div></div>
                    </div>
                    <div className="de_tab tab_simple">
                      <div className="de_tab_content">
                        <h6>Creator</h6>
                        <div className="item_author">
                          <div className="author_list_pp">
                            <Link to={`/author/${items.creatorId}`}>
                              <img className="lazy" src={items.creatorImage} alt="" />
                              <i className="fa fa-check"></i>
                            </Link>
                          </div>
                          <div className="author_list_info">
                            <Link to={`/author/${items.creatorId}`}>{items.creatorName}</Link>
                          </div>
                        </div>
                      </div>
                      <div className="spacer-40"></div>
                      <h6>Price</h6>
                      <div className="nft-item-price">
                        <img src={EthImage} alt="" />
                        <span>{items.price}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="row">
              <div className="col-md-6 text-center">
                <Skeleton width="100%" height="100%" borderRadius={1} />
              </div>
              <div className="col-md-6">
                <div className="item_info">
                  <Skeleton width={300} height={40} />

                  <div className="item_info_counts">
                    <Skeleton width={80} height={30} borderRadius={1} />
                    <Skeleton width={80} height={30} borderRadius={1} />
                  </div>

                  <Skeleton width="100%" height="80%" />

                  <div className="d-flex flex-row">
                    <div className="mr40">
                      <h6>Owner</h6>
                      <div className="item_author">
                        <div className="author_list_pp">
                          <Skeleton
                            width="50px"
                            height="50px"
                            borderRadius="50%"
                          />
                        </div>
                        <div className="author_list_info">
                          <Skeleton width="125px" height="20px" />
                        </div>
                      </div>
                    </div>
                    <div></div>
                  </div>
                  <div className="de_tab tab_simple">
                    <div className="de_tab_content">
                      <h6>Creator</h6>
                      <div className="item_author">
                        <div className="author_list_pp">
                          <Skeleton
                            width={50}
                            height={50}
                            borderRadius={50}
                          />
                        </div>
                        <div className="author_list_info">
                          <Skeleton width={125} height={20} />
                        </div>
                      </div>
                    </div>
                    <div className="spacer-40"></div>
                    <h6>Price</h6>
                    <div className="nft-item-price">
                      <Skeleton width={75} height={20} borderRadius={1} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default ItemDetails;
