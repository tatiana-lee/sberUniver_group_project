import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";

import { PostCard } from "../PostCard";
import styles from "./style.module.css";
import cn from "classnames";
import { Pagination } from "../Pagination";
import api from "../../utils/api.js";
import { POSTSONPAGE } from "../../utils/config";
import { HeaderLine } from "../HeaderLine";
import { GoBackButton } from "../GoBackButton";
import PageContext from "../../contexts/PageContext";

export const PostList = ({
  list,
  pagesCnt,
  favorite,
  setFavorite,
  user,
  login,
  setPagesCnt,
  setPostsState,
}) => {
  const params = useParams();  
  const { page, setPage, update, setFlag } = useContext(PageContext);
  useEffect(() => {
    if (login) {
      if(update){
        sliceList(page);
        setFlag(false);
      }
    }
  }, [page, login, update]);

  const sliceList = (el) => {
    api
      .getPostsOnPage(el, POSTSONPAGE)
      .then((data) => {
        setPagesCnt(Math.ceil(data.total / POSTSONPAGE));
        setPostsState(data.posts);
        data.posts.forEach((el) => {
          if (el.likes.includes(localStorage.getItem("userID"))) {
            setFavorite((prevState) => [...prevState, el._id]);
          }
        });
      })
      .catch((err) => {
        alert(err);
      });
  };

  const tagSearch = (tag) => {
    api
      .getPosts()
      .then((data) => {
        // setPostsState(data.filter(el =>el.tags.includes(tag.trim()))) //поиск по тегу без учета пробелов в тегах

        /*Поиск по тегам не зависимо от наличия пробелов в тегах*/
        let postWithTag = [];
        data.forEach((el) => {
          el.tags.forEach((tagOnPost) => {
            if (tagOnPost.trim() === tag.trim()) {
              if (!postWithTag.includes(el)) {
                postWithTag.push(el);
              }
            }
          });
        });
        setPostsState(postWithTag);
        /*======================================================*/
      })
      .catch((err) => {
        alert(err);
      });
  };

  return (
    <div className={cn("sectionInner", styles.cardListContainer)}>
      <HeaderLine />
      {Object.keys(params).length ? (
        <>
          <div className={cn(styles.gridTable)}>
            {list?.map((item) => (
              <PostCard
                post={item}
                key={item._id}
                isInFavorite={favorite.includes(item._id)}
                setFavorite={setFavorite}
                user={user}
                setPostsState={setPostsState}
                setPagesCnt={setPagesCnt}
                tagSearch={tagSearch}
              />
            ))}
          </div>
          <GoBackButton />
        </>
      ) : (
        <>
          <div className={cn(styles.gridTable)}>
            {list?.map((item) => (
              <PostCard
                post={item}
                key={item._id}
                isInFavorite={favorite.includes(item._id)}
                setFavorite={setFavorite}
                user={user}
                setPostsState={setPostsState}
                setPagesCnt={setPagesCnt}
                tagSearch={tagSearch}
              />
            ))}
          </div>

          <Pagination pagesCnt={pagesCnt} />
        </>
      )}
    </div>
  );
};
