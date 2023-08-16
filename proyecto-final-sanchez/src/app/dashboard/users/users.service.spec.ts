import { TestBed } from "@angular/core/testing";
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing"
import { UsersService } from "./users.service"
import { RouterTestingModule } from "@angular/router/testing";
import { User } from "./models";

describe('UserService', () => {
    let service: UsersService;
    let httpController: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, RouterTestingModule],
            providers: [

            ]
        });
        service = TestBed.inject(UsersService);
        httpController = TestBed.inject(HttpTestingController);
    })

    
    it('Si el login es valido el observable authUser$ debe emitir un valor', () => {



        const mockResponse: User[] = [
            {
                name: "test",
                email: "test@mail.com",
                password: "12345678",
                lastname: "test",
                token: "aG1Ptx4ZBtwJCAoyjxQy",
                id: 1
            },
            {
                name: "usuario",
                email: "b@hotmail.com",
                lastname: "uno",
                password: "12345678",
                token: "yFKPbM27383r8tikXLVZ",
                id: 2
            }
        ];

        service.getUsers().subscribe(users => {
            expect(users.length).toBe(2);
            expect(users).toEqual(mockResponse);
        });



        const request = httpController.expectOne('http://localhost:3000/users');
        expect(request.request.method).toBe('GET');
        request.flush(mockResponse);
        
    });
    afterEach(() => {
        httpController.verify();
    })

})

