import { apiClient } from './client';


export interface PopularList {
  id: string;
  title: string;
  description: string | null;
  type: 'WATCHED' | 'WATCHLIST' | 'FAVORITES' | 'CUSTOM';
  coverImage: string | null;
  createdAt: string;
  user: {
    id: string;
    username: string;
    displayName: string | null;
    avatarUrl: string | null;
  };
  likeCount: number;
  itemCount: number;
  previewPosters: string[];
}


export interface ListDetailResponse {
  id: string;
  title: string;
  description: string | null;
  type: 'WATCHED' | 'WATCHLIST' | 'FAVORITES' | 'CUSTOM';
  visibility: 'PUBLIC' | 'PRIVATE';
  coverImage: string | null;
  createdAt: string;
  updatedAt: string;
  user: {
    id: string;
    username: string;
    displayName: string | null;
    avatarUrl: string | null;
    bio: string | null;
    location: string | null;
    createdAt: string;
  };
  items: Array<{
    id: string;
    contentId: string;
    position: number;
    note: string | null;
    addedAt: string;
    content: {
      id: string;
      title: string;
      posterPath: string | null;
      tmdbId: number;
      type: 'MOVIE' | 'TV';
      releaseDate: string | null;
      overview: string | null;
    };
  }>;
  likeCount: number;
  likedByMe: boolean;
  isOwner: boolean;
}


interface ToggleLikeResponse {
  liked: boolean;
  likeCount: number;
}


interface ReorderResponse {
  items: Array<{
    id: string;
    contentId: string;
    position: number;
    note: string | null;
    content: {
      id: string;
      title: string;
      posterPath: string | null;
      tmdbId: number;
      type: 'MOVIE' | 'TV';
      releaseDate: string | null;
      overview: string | null;
    };
  }>;
}

export const listsApi = {

  popular: async (limit = 10): Promise<PopularList[]> => {
    const { data } = await apiClient.get<PopularList[]>('/lists/popular', {
      params: { limit },
    });
    return data;
  },


  getListDetail: async (listId: string): Promise<ListDetailResponse> => {
    const { data } = await apiClient.get<ListDetailResponse>(`/lists/${listId}`);
    return data;
  },


  reorderListItems: async (
    listId: string,
    items: Array<{ id: string; position: number }>
  ): Promise<ReorderResponse> => {
    const { data } = await apiClient.patch<ReorderResponse>(
      `/lists/${listId}/items/reorder`,
      { items }
    );
    return data;
  },

 
  toggleListLike: async (listId: string): Promise<ToggleLikeResponse> => {
    const { data } = await apiClient.post<ToggleLikeResponse>(
      `/lists/${listId}/like`,
      {}
    );
    return data;
  },
};
