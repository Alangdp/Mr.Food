import NavBarClient from '@/components/navigators/navbar.client';
import SideBarClient from '@/components/navigators/sidebar.client';
import MotionWrapper from '@/components/router/MotionWrapper';
import PrivateClient from '@/components/router/PrivateClient';

export default function AccountClient() {
  return (
    <PrivateClient>
      <div>
        <NavBarClient />
        <SideBarClient />
        <MotionWrapper>
          <div className="w-full flex items-center justify-center h-20">
            <h2 className="text-2xl font-medium text-secondary">
              EM DESENVOLVIMENTO
            </h2>
          </div>
        </MotionWrapper>
      </div>
    </PrivateClient>
  );
}
